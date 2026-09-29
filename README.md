# Airbnb Listing Clone & Production Architecture (Take-Home Task)

A pixel-perfect, production-grade recreation of the Airbnb property listing page, full-screen Photo Tour, and Single-Photo Lightbox built with React, TypeScript, and Tailwind CSS.

---

## 🎯 Overview of Implemented Views

1. **Listing Page (`ListingDetailView.tsx`)**:
   - **Header & Navigation**: Sticky sub-header tabs (*Photos, Amenities, Reviews, Location*) with dynamic scroll-tracking and quick actions.
   - **Hero Gallery**: 5-image grid with rounded corners, hover zoom effects, and *"Show all photos"* trigger.
   - **60:40 Layout Grid**: Synchronized 60% left content flow with a 40% sticky booking card.
   - **Guest Favourite Badge**: Flanking laurel wreaths, rating stats, and review counts.
   - **Interactive Calendar**: 2-month side-by-side date picker with selected range highlighting (18–23 Oct) and keyboard icon.
   - **7-Category Rating Breakdown**: Cleanliness (5.0), Accuracy (5.0), Check-in (5.0), Communication (5.0), Location (4.8), Value (4.8).
   - **Filter Pills & 6-Review Grid**: Detailed user reviews with star ratings, avatars, and dates.
   - **Where You'll Be & Neighborhood Highlights**: Interactive map container and area summary.
   - **Host & Co-Hosts Card**: Mirashya Homes host card with 8 co-hosts, verification badge, and host details.
   - **Things to Know**: 3-column house rules, safety & property, and cancellation policy.
   - **More Stays Nearby**: 2-page paginated interactive carousel (5 items per page).

2. **Photo Tour Overlay (`PhotoTour.tsx`)**:
   - Categorized room navigation (*Living room 1, Living room 2, Full kitchen, Bedroom, Full bathroom, Gym, Exterior, Pool, Additional photos*).
   - Sticky category header with quick anchor scrolling.

3. **Single-Photo Lightbox View (`PhotoTour.tsx`)**:
   - Pure white background matching the reference design.
   - Header with 3×3 grid icon (return to gallery), room title, photo counter (`X of 43`), and close button.
   - Circular prev/next navigation controls.
   - Full keyboard navigation (`←` / `→` arrow keys, `ESC` to close).

4. **50+ Amenities Modal (`AmenitiesModal.tsx`)**:
   - Categorized amenities modal with sticky header, close button, and background scroll locking.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Build for production (TypeScript check + Vite bundle)
npm run build
```

---

## 🏛️ Architecture & System Design Deliverables

- **[`ARCHITECTURE.md`](./ARCHITECTURE.md)**: Full production-scale system design covering edge CDN caching, Kong API gateway, microservices decomposition, distributed locking (Redlock) for double-booking prevention, Kafka event streams, OpenSearch geo-indexing, and Kubernetes autoscaling.
- **[`architecture_diagram.svg`](./architecture_diagram.svg)**: Vector architecture diagram for production marketplace scaling.
- **[`architecture_diagram.html`](./architecture_diagram.html)**: Standalone visual HTML viewer for the architecture diagram.
- **[`AI_PROMPTS.md`](./AI_PROMPTS.md)**: Chronological log of prompts and AI agent workflows used during development.
- **[`agent_configs/`](./agent_configs/)**: AI subagent specifications and skill definitions (`frontend-specialist`, `visual-qa-auditor`, `architecture-engineer`).

---

## 📁 Key Project Structure

```text
├── agent_configs/                  # AI sub-agent & skill configurations
│   ├── frontend-specialist.json
│   ├── visual-qa-auditor.json
│   ├── architecture-engineer.json
│   └── skills/
│       └── airbnb-design-system/SKILL.md
├── src/
│   ├── components/
│   │   ├── ListingDetail/
│   │   │   ├── ListingDetailView.tsx  # Main property page view
│   │   │   ├── PhotoTour.tsx          # Photo Tour & Lightbox overlay
│   │   │   └── AmenitiesModal.tsx     # 50+ categorized amenities modal
│   │   ├── Navbar/Navbar.tsx          # Header & search filters
│   │   └── Map/Map.tsx                # Location map component
│   ├── data/mockListings.ts           # Property dataset
│   └── App.tsx
├── ARCHITECTURE.md                 # Scalable system design documentation
├── architecture_diagram.svg        # Architecture diagram (SVG)
├── architecture_diagram.html       # Printable/Exportable Architecture Viewer
├── AI_PROMPTS.md                   # Sequence of AI prompts log
└── README.md
```

