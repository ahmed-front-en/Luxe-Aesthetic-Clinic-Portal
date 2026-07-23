# L'ESTHÉTIQUE DUBAÏ — The Art of Refinement

A production-quality single-page website for a luxury aesthetic clinic in Dubai, converted from Google Stitch AI-generated designs.

## Design System

Built on a **dark editorial** aesthetic — near-black primary, bronze accents, DM Sans typography.

| Token | Value |
|---|---|
| Primary | `#0A0A0A` (near-black) |
| Secondary | `#735A3A` (bronze) |
| Surface | `#FFF8F3` (warm cream) |
| Display Font | Playfair Display |
| Body Font | DM Sans |

## Structure

```
Luxe-Aesthetic-Clinic-Portal/
├── index.html          # Single-page site
├── css/
│   ├── style.css       # Design tokens, layout, components
│   └── animations.css  # Scroll reveals, transitions, hover effects
├── js/
│   ├── main.js         # Navigation, scroll, mobile menu, parallax
│   └── booking.js      # Multi-step booking stepper
├── assets/
│   ├── images/         # Hero and treatment photography
│   └── icons/          # Material Symbols (loaded via Google Fonts CDN)
└── README.md
```

## Features

- Semantic HTML5 with ARIA landmarks
- CSS custom properties for full design token reuse
- IntersectionObserver-based scroll reveals
- Sticky navigation with scroll-driven blur transition
- Responsive 12-column grid (desktop) to stacked (mobile)
- 4-step booking consultation stepper
- Asymmetrical treatment card layout
- Parallax hero background
- Mobile hamburger slide-in menu
- Full accessibility support (skip link, reduced-motion, aria attributes)

## Usage

Open `index.html` in a browser. No build step required.

## Credits

Designs generated via Google Stitch. Built with pure HTML5, CSS3, and Vanilla JavaScript.
