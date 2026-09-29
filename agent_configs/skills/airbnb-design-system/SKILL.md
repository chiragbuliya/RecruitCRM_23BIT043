---
name: airbnb-design-system
description: Airbnb UI guidelines, typography tokens, component ratios, and visual specifications.
---

# Airbnb Design System Guidelines

## 1. Color Palette
- Primary Brand Coral: #FF385C (Active #E00B41, Hover #D70466)
- Dark Neutral Text: #222222 (Tailwind 
eutral-900 / 
eutral-800)
- Subtitle & Secondary: #717171 (Tailwind 
eutral-600 / 
eutral-500)
- Borders: #DDDDDD (Tailwind 
eutral-200 / 
eutral-300)
- Backgrounds: #FFFFFF and #F7F7F7 (Tailwind 
eutral-50)

## 2. Layout Grid Ratios
- Desktop Main View: 60% Left Content : 40% Sticky Booking Card
- Hero Photo Grid: 1 large left image (2 span) + 4 right grid images with rounded corners
- Booking Card: Max-width 340px-360px, rounded-2xl, sticky viewport tracking

## 3. Keyboard & Accessibility
- Lightbox: ArrowLeft (Previous), ArrowRight (Next), Escape (Close)
- Modals: document.body.style.overflow = 'hidden' on open with clean teardown
