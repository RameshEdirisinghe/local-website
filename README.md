# 🌿 Ceylon Spice Co. — React Frontend

A beautiful, modern e-commerce landing page for selling Ceylon Cinnamon and Black Pepper to both local (Sri Lankan) and international buyers.

## Features

- **Hero Section** — Full-screen cinematic hero with floating stats and animated cinnamon background
- **Products Section** — Cinnamon & Pepper cards with grade tabs, LKR/USD currency toggle, photo hover effects
- **About / Our Story** — Two-column layout with layered photos and feature grid
- **Reviews Section** — Customer testimonials with local/international filter tabs (Sinhala + English)
- **Order / Quote Form** — Full enquiry form with:
  - Local vs International buyer toggle
  - Product selector with all grades
  - Quantity with unit selector (kg / MT / lbs)
  - Currency preference (USD, EUR, GBP, LKR, JPY, AUD)
  - Shipping method selector (Sea / Air / Local Pickup)
  - Payment method info panel (Bank Transfer, L/C, Wise, COD)
  - Form validation
- **Footer** — Links, contact info, certifications

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Then open [http://localhost:5173](http://localhost:5173)

## Tech Stack

- React 18 + Vite
- Pure CSS (no UI library)
- Google Fonts: Cormorant Garamond + Crimson Text + Jost
- Lucide React icons
- Unsplash images (no API key needed)

## Customisation

### Change Contact Details
Edit `src/components/OrderSection.jsx` and `src/components/Footer.jsx`

### Change Prices
Edit the `priceUSD` and `priceLKR` fields in `src/components/Products.jsx`

### Add Payment Gateway
The form in `OrderSection.jsx` has a `handleSubmit` function — replace the `setSubmitted(true)` line with your gateway API call (Stripe, PayHere, etc.)

### Change Images
Replace Unsplash URLs in `Hero.jsx`, `Products.jsx`, and `About.jsx` with your own product photos.

## Folder Structure

```
src/
├── App.jsx
├── main.jsx
├── index.css          ← Global styles & design tokens
└── components/
    ├── Navbar.jsx / .css
    ├── Hero.jsx / .css
    ├── Products.jsx / .css
    ├── About.jsx / .css
    ├── Reviews.jsx / .css
    ├── OrderSection.jsx / .css
    └── Footer.jsx / .css
```
