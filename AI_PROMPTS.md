# Sequence of AI Prompts & Workflow Log

This document records the AI-assisted development workflow, subagent reasoning, and sequential prompts used to build the pixel-perfect Airbnb Clone.

---

## 1. Development Methodology & Subagent Strategy

We used an iterative, agentic pair-programming workflow:
1. **Visual Calibration & Component Isolation**: Uploading reference screenshots at each step to calibrate exact typography, padding, color hexes, and layout proportions.
2. **Deterministic Layouts & Sticky Synchronizations**: Synchronizing the left content flow with a sticky booking card and sub-header navigation bar.
3. **Modular Sub-Views**:
   - `ListingDetailView.tsx` (Main Listing Screen)
   - `PhotoTour.tsx` (Categorized full-screen photo gallery)
   - `PhotoTour.tsx` (Single-photo Lightbox with arrow key navigation)
   - `AmenitiesModal.tsx` (Categorized 50+ amenities modal with scroll-locking)
   - `Map.tsx` (Interactive location view)

---

## 2. Chronological Prompt Sequence

### Phase 1: Core Setup & Visual Replication
1. **Prompt 1**: Initialized Vite + React + TypeScript + Tailwind CSS project with Airbnb design system tokens and mock data for Candolim listing.
2. **Prompt 2**: Built sticky header navigation with tabs (Photos, Amenities, Reviews, Location), search filters, and profile menu.
3. **Prompt 3**: Created 5-image hero photo grid with hover zoom, rounded corners, and "Show all photos" trigger.

### Phase 2: Refinements & Fine Visual Calibration
4. **Prompt 4**: *"the logo you created is very bad, copy as it is or just revert back to the previous one"* -> Restored the authentic Airbnb coral pink logo SVG and brand header.
5. **Prompt 5**: *"ok now when we click on reserve button this text appers at the bottom"* -> Added toast notification *"You won't be charged yet"* upon clicking Reserve.
6. **Prompt 6**: *"ok now when i click on show all 50 ammenities"* -> Implemented full categorized AmenitiesModal with sticky header, close button, and category sections.
7. **Prompt 7**: *"and why have you cut washing machine, correct it"* -> Fixed strikethrough styling to display clean text for available bedroom amenities.
8. **Prompt 8**: *"where is the bottom arrow in the scrollbar"* & *"the arrows in the scrollbar are not visible properly"* -> Added custom WebKit scrollbar rules with crisp decrement and increment SVG arrow steppers.
9. **Prompt 9**: *"now correct this section, remove boundary, make it sqare and all and also the arrows in the scrollbar are not visible properly"* -> Converted calendar to borderless 2-month side-by-side view with square grid cells.
10. **Prompt 10**: *"reduce the size of the calender and icrease the size of booking card component a bit"* -> Calibrated 12-column grid proportions.

### Phase 3: Scroll-Down Sections & Host Profiles
11. **Prompt 11**: *"now when i scroll down . write same text with same font, size styling, space etc"* -> Built Laurel wreath Guest Favourite header (4.95 rating), 7-column category breakdown, category pills, 6-review grid with avatars, map highlights, and Mirashya Homes Host card with co-hosts grid.
12. **Prompt 12**: *"now this"* -> Added *"Things to know"* 3-column section and *"More stays nearby"* with interactive 2-page pagination.

### Phase 4: Final Touch-ups & Overlay Views
13. **Prompt 13**: *"increase size of this and make it in the centre"* -> Enlarged and centered the 7-column rating breakdown and category pills.
14. **Prompt 14**: *"remove this part, make it only till more stays nearby"* -> Removed the footer so the page terminates cleanly after More stays nearby.
15. **Prompt 15**: *"remove the above line and reduce the spaceing between guest faourite and Hosted by Mirashya Homes"* -> Removed border line and tightened spacing around the Guest favourite badge.
16. **Prompt 16**: *"guest favourite, 4.95 and 19 less bold and use the same font that you used for Entire serviced apartment in Candolim, India. and guest fav alignment should be centre"* -> Matched typography and centered Guest favourite box.
17. **Prompt 17**: *"make the spacing of this rectangle component like this, decrese a bit from both top and bottom"* -> Added flanking laurel wreaths and reduced card vertical padding.
18. **Prompt 18**: *"write this much content and also show more, show less should work"* -> Implemented full listing description with interactive Show more / Show less toggle.
19. **Prompt 19**: *"this component is square, make it square don't decrease font size just the size of this component"* -> Balanced sticky booking card into square proportions.
20. **Prompt 20**: *"make it 60:40"* -> Set exact 60% : 40% column ratio between left content and sticky booking widget.
21. **Prompt 21**: *"use same font and size as Entire serviced apartment in Candolim, India for Where you'll sleep,What this place offers, 5 nights in Candolim"* -> Harmonized section heading typography across all main sections.
22. **Prompt 22**: Implemented single-photo Lightbox overlay in PhotoTour with prev/next buttons and keyboard arrow key navigation.