# Jignasa Experia — Premium Cultural Tourism Platform
> *“Experience Andhra. Become Andhra.”*

A production-ready, high-performance experiential cultural tourism platform designed to benchmark with luxury travel leaders like **Airbnb Experiences**, **GetYourGuide**, and **National Geographic Travel**.

Built with React 19, TypeScript, Tailwind CSS v4, Lucide Icons, and Canvas Confetti.

---

## 🏛️ Brand & Visual Identity
- **Brand**: Jignasa Experia (జిజ్ఞాస ఎక్స్‌పీరియా)
- **Tagline**: *“Experience Andhra. Become Andhra.”*
- **Aesthetic**:
  - Warm Ivory backgrounds (`#FAF7F2`)
  - Deep Andhra Red (`#8B1E1E`) & Terracotta accents
  - Auspicious Turmeric Gold (`#D49B28`) highlights
  - Charcoal Black typography (`#1A1715`)
  - Editorial serifs (*Playfair Display*, *Cormorant Garamond*) and modern sans-serif (*Plus Jakarta Sans*)

---

## 🚀 Key Modules & Capabilities

### 1. Home Page
- **Cinematic Hero**: Full-bleed background imagery, dynamic counter statistics (50+ curated experiences, 5000+ guests hosted, 10+ facilitators, 8+ cities), dual CTAs.
- **6 Featured Experiences**:
  1. Handloom Heritage – Mangalagiri (Amaravati–Vijayawada)
  2. Culinary Andhra – Amaravati
  3. RK Beach Cultural Walk – Vizag
  4. Tirupati City Cultural Tour – Tirupati
  5. Kondapalli Toys Experience – Amaravati
  6. Lakshmi Narasimha Temple Experience – Amaravati
- **Why Jignasa Experia**: 4 core pillars (*Cultural Facilitators, Not Guides*, *Participatory Tourism*, *VIP Sacred Access*, *Tangible Keepsake Kits*).
- **Testimonials Carousel**: Real reflections from global NRIs and cultural scholars with interactive navigation.
- **Bespoke Concierge Drawer**: Interactive "Talk to Experience Curator" live dialogue desk with Acharya Srinivas Sharma.

### 2. Experiences Catalog
- Real-time search by keyword (Mangalagiri, toys, stupa, feast).
- Multi-filter sidebar:
  - **Category**: Temples & Spirituality, Handlooms & Handicrafts, Performing Arts, Heritage, Culinary, Nature, Mix
  - **Location**: Amaravati – Vijayawada, Guntur, Tirupati, Vizag
  - **Duration**: Under 2 hours, 2–4 hours, Half-day, Full-day
  - **Date Selector**
  - **Price Range Slider**: ₹1,000 – ₹10,000+
- Sort by popularity, rating, and price.
- All 9 journeys catalogued with complete itineraries, pricing, and facilitators.

### 3. Individual Experience Detail Page (Core Booking Engine)
- Image carousel with thumbnail gallery and high-res photography.
- Detailed narrative, highlights, target patrons, inclusions, and hourly itinerary.
- **Sticky Dynamic Booking Panel**:
  - **Step 1: Experience Types** (Private Tour, Shared Immersion, Group Booking).
  - **Step 2: Date & Time Slot Picker** (Dawn Sacred Ritual, Morning Walk, Sunset Craft).
  - **Step 3: Interactive Guest Counter** (Adults +/-, Children +/-).
  - **Step 4: Dynamic Pricing Logic**:
    - *Private Tour*: ₹3,600 (first adult) + ₹2,200 (extra adults) + ₹1,500 (child)
    - *Shared Tour*: ₹2,500 per adult + ₹1,700 per child
    - *Group Booking (min 10)*: 10–17 (₹2,200/₹1,700), 18–25 (₹2,000/₹1,500), 25+ (VIP Charter desk quote)
  - **Step 5: Enhancements & Add-ons**:
    - Chauffeured AC Pickup & Drop (Vijayawada ₹1,800/3 guests, Guntur ₹2,300/3 guests, auto-scaled based on vehicle capacity)
    - Special Sanctum Puja Tickets (₹500 each, editable)
    - GI-Certified Keepsake Souvenir Kits (₹1,000 each, editable)
    - Cinematic Photography & Reels (₹1,500 flat)
  - **Step 6: Customer Details** (Full name, phone, email, special notes).
  - **Step 7: Itemized Breakdown** (Base Fare + Add-ons + 5% GST = Total).
  - **Step 8: Payment Gateway Simulation** (UPI with QR, Cards, NetBanking, Stripe International).
  - **Step 9: Sanctified Confirmation Modal** (Confetti, Booking Code, WhatsApp dispatch notice, digital pass download).

### 4. Patron Portal (Customer Dashboard)
- Upcoming journeys with 24-hour interactive add-on modification window.
- Downloadable official GST Tax Invoices (SAC: 998555).
- Cancellation and rescheduling modal with 100% full refund policy.
- Past experience records and certificates.

### 5. Cultural Operations Admin Desk
- Real-time revenue analytics, average journey value, and monthly velocity charts.
- Master bookings table with search and filtering.
- Patron detail inspection drawer.
- Experience catalog editor and temple blackout calendar manager.
- 25+ guest group charter approval desk.

### 6. FAQ & Cultural Etiquette
- Categorized accordion covering dress codes, temple protocols, accessibility, and payments.

### 7. Bilingual Experience
- Instant toggle between **English** and authentic **Telugu (తెలుగు)** with full typographic rendering.

---

## 📦 Ready-to-Host Deployment Guide

The project is fully pre-configured for zero-friction hosting:

### Option A: Vercel (Recommended)
1. Push repository to GitHub or run:
   ```bash
   npx vercel
   ```
2. Build command: `npm run build`
3. Output directory: `dist`
4. Pre-configured `vercel.json` automatically handles SPA routing and asset caching.

### Option B: Netlify
1. Connect repository or run:
   ```bash
   npx netlify deploy --prod
   ```
2. Pre-configured `netlify.toml` and `public/_redirects` automatically route all traffic to `/index.html`.

### Option C: Docker / Self-Hosting (VPS / AWS / DigitalOcean)
```bash
docker build -t jignasa-experia .
docker run -d -p 80:80 jignasa-experia
```
Includes multi-stage Alpine build and high-performance Nginx with Gzip compression and security headers.

---

## 🛠️ Local Development & Build

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Compile production build
npm run build

# Preview production build locally
npm run preview
```
