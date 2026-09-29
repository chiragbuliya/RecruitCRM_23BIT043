# Production Architecture Design: Scalable Vacation Rental Marketplace

This document outlines the high-level and detailed architecture for a production-scale vacation rental platform (Airbnb-scale). It covers the scaling strategy across **Frontend, Backend Microservices, Storage & Databases, Search & Discovery, Media Pipeline, and Deployment Infrastructure**.

---

## 1. High-Level Architecture Diagram

`mermaid
graph TB
    subgraph Client Tier
        Web[Web Client - Next.js / React]
        Mobile[Mobile Apps - iOS / Android]
    end

    subgraph Edge & CDN Layer
        Cloudflare[Cloudflare / AWS CloudFront CDN]
        WAF[Web Application Firewall & DDoS Protection]
        EdgeWorker[Edge Compute - SSR Caching & Geo-Routing]
    end

    subgraph API Gateway Layer
        APIGW[Kong / AWS API Gateway]
        AuthN[OAuth2 / JWT / Auth0 Auth Service]
        RateLimit[Rate Limiting & Throttling Redis]
    end

    subgraph Core Microservices Tier
        ListingSvc[Listing Service]
        BookingSvc[Booking & Availability Service]
        SearchSvc[Search & Discovery Service]
        ReviewSvc[Reviews & Ratings Service]
        UserSvc[User & Host Profile Service]
        PaymentSvc[Payments & Payouts Service]
        NotificationSvc[Notification Service WebSockets/Push]
    end

    subgraph Event Streaming & Async Tier
        Kafka[Apache Kafka / AWS MSK Event Bus]
        WorkerPool[Async Background Workers]
    end

    subgraph Storage & Database Layer
        PostgresListing[(PostgreSQL / CockroachDB - Listings & Users)]
        PostgresBooking[(PostgreSQL - ACID Bookings & Ledgers)]
        RedisCache[(Redis Cluster - Session & Availability Cache)]
        OpenSearch[(OpenSearch / Elasticsearch - Geo & Text Index)]
        S3Media[(AWS S3 / Cloudflare R2 - Raw & Processed Media)]
    end

    subgraph Media Processing Pipeline
        LambdaImg[Serverless Image Optimizer / WebP & AVIF Resizer]
    end

    %% Flow Connections
    Client Tier --> Cloudflare
    Cloudflare --> WAF --> EdgeWorker
    EdgeWorker --> APIGW
    APIGW --> AuthN
    APIGW --> RateLimit
    APIGW --> ListingSvc
    APIGW --> BookingSvc
    APIGW --> SearchSvc
    APIGW --> ReviewSvc
    APIGW --> UserSvc
    APIGW --> PaymentSvc

    %% Service to Storage Connections
    ListingSvc --> PostgresListing
    ListingSvc --> RedisCache
    BookingSvc --> PostgresBooking
    BookingSvc --> RedisCache
    SearchSvc --> OpenSearch
    ReviewSvc --> PostgresListing
    UserSvc --> PostgresListing
    PaymentSvc --> PostgresBooking

    %% Events Flow
    ListingSvc --> Kafka
    BookingSvc --> Kafka
    PaymentSvc --> Kafka
    ReviewSvc --> Kafka
    Kafka --> WorkerPool
    WorkerPool --> OpenSearch
    WorkerPool --> NotificationSvc
    WorkerPool --> LambdaImg

    %% Media Pipeline
    S3Media --> LambdaImg --> Cloudflare
`

---

## 2. Tier-by-Tier Scaling Strategy

### A. Frontend Tier & Edge Delivery
- **Framework**: React / Next.js with hybrid Incremental Static Regeneration (ISR) and Client-Side Hydration for dynamic user components (sticky booking card, interactive date pickers, photo tour lightbox).
- **Edge Caching**:
  - Top 10,000 popular listings cached at CDN edge locations with stale-while-revalidate caching strategy.
  - Sub-50ms Time to First Byte (TTFB) globally.
- **Client Performance**:
  - Image optimization using WebP/AVIF with responsive srcset.
  - Virtualized rendering for review grids and infinite-scroll search listings.
  - Smooth 60fps animations with Tailwind CSS and Framer Motion.

---

### B. API Gateway & Microservices
- **API Gateway**: Kong / AWS API Gateway handling SSL termination, global rate limiting, API versioning, and JWT authentication.
- **Service Breakdown**:
  1. **Listing Service**: Manages property details, room configurations, amenities, house rules, and translations.
  2. **Booking & Calendar Engine**:
     - High-concurrency ACID transactions with Optimistic Concurrency Control (OCC) and Redis-backed distributed locks to prevent double booking.
     - 2-phase reservation state: HOLD (10 min temporary hold with TTL) → CONFIRMED upon payment webhook.
  3. **Search & Discovery Service**:
     - Geo-spatial search using bounding boxes, radial polygon search, and price/amenity filters.
  4. **Reviews & Rating Engine**:
     - Calculates aggregate ratings (7-category ratings breakdown: cleanliness, accuracy, check-in, communication, location, value) asynchronously via event streams.
  5. **Payment Orchestration**:
     - Idempotent payment intent handling integrating Stripe, Razorpay, and global payout gateways.

---

### C. Storage & Database Tier
| Storage Layer | Technology | Purpose |
|---|---|---|
| **Primary Relational DB** | PostgreSQL / Aurora Serverless v2 | Structured relational data (Users, Listings, Bookings, Payments) with multi-AZ replication. |
| **Search Engine** | OpenSearch / Elasticsearch | Geo-spatial indexing (geo_point), full-text search, filters for 50+ amenities, pricing ranges. |
| **In-Memory Cache** | Redis Cluster (ElastiCache) | Date-range availability bitmaps, rate-limiting tokens, session tokens, cached listing metadata. |
| **Blob Storage** | AWS S3 / Cloudflare R2 | High-resolution property photos, tour albums, floorplans, documents. |
| **Event Bus** | Apache Kafka | Asynchronous event streaming (Booking created, Price changed, Review submitted). |

---

## 3. High-Concurrency Double-Booking Prevention

`mermaid
sequenceDiagram
    autonumber
    actor Guest as Guest (Web/Mobile)
    participant APIGW as API Gateway
    participant BookingSvc as Booking Service
    participant Redis as Redis (Distributed Lock)
    participant DB as Postgres (ACID Storage)
    participant PaySvc as Payment Service

    Guest->>APIGW: POST /api/v1/bookings/reserve (ListingID, Dates)
    APIGW->>BookingSvc: Forward request + Auth Token
    BookingSvc->>Redis: Acquire Lock lock:listing:{id}:{dates}
    alt Lock Failed (Dates Already Held/Booked)
        Redis-->>BookingSvc: Lock Denied
        BookingSvc-->>Guest: 409 Conflict: Dates currently unavailable
    else Lock Acquired
        BookingSvc->>DB: Check active overlapping reservations (SELECT FOR UPDATE)
        BookingSvc->>DB: Insert Reservation (Status: 'PENDING_PAYMENT', TTL: 10m)
        BookingSvc->>Redis: Set Temporary Hold Token (10m expiration)
        BookingSvc->>PaySvc: Create Payment Intent
        PaySvc-->>BookingSvc: Payment Intent Client Secret
        BookingSvc-->>Guest: 201 Created (Payment Intent Secret)
    end
`

---

## 4. Deployment & Infrastructure Strategy

- **Container Orchestration**: Kubernetes (EKS / GKE) with Karpenter autoscaling based on CPU/Memory and HTTP traffic demand.
- **CI/CD Pipeline**: GitHub Actions / ArgoCD with automated unit testing, TypeScript build validation, and blue-green zero-downtime deployments.
- **Observability**: Prometheus & Grafana for metrics, OpenTelemetry & Jaeger for distributed tracing, and Datadog / ELK for log aggregation.
- **Multi-Region Disaster Recovery**: Active-Active global read replicas with automated failover routing via Route 53 latency-based DNS.
