# Six7 Plumbing — plumbing.six7.lk
*Production-Ready • Mobile-First • Emergency-First • 2026*

## Quick Start
1. Clone repo: `git clone https://github.com/six7/plumbing-web.git`
2. Test locally: Open `index.html` in browser (no build step required)
3. Update pricing in `/pricing/index.html` if rates change
4. Push to `main` → auto-deploys via GitHub Actions to Vercel/GitHub Pages

## Critical Paths
- ✅ ALL pages use `/pagename/index.html` routing (NO .html at root)
- ✅ All CTAs → WhatsApp pre-filled OR tel:+94758244216
- ✅ All forms → formsubmit.co → pforms@six7.lk
- ✅ Payment reminder banner → dismissible, sticky top, localStorage persist
- ✅ Mobile-first: test on 360px width minimum
- ✅ Emergency pages load first in LCP

## SEO Checklist
- [x] JSON-LD injected on all pages via schema.js
- [x] Meta title/description unique per page
- [x] Canonical URLs set to /pagename/ format
- [x] Image alt text includes service + location
- [x] Internal links use keyword-rich anchor text
- [x] sitemap.xml auto-generated with all 35+ pages
- [x] robots.txt blocks /assets/ JS/CSS paths

## Pricing & Disclaimer
- Pricing page: `/pricing/index.html` (extracted from reference)
- Disclaimer: `/disclaimer/index.html` (mandatory checkbox on forms)
- Payment reminder banner on ALL pages (non-negotiable)

## File Structure
```
plumbing.six7.lk/
├── index.html                    # Home / Emergency Hub
├── emergency/index.html          # Emergency Response Page
├── pricing/index.html            # Transparent Hourly Rates
├── areas/index.html              # Service Area Coverage
├── disclaimer/index.html         # Legal & Terms
├── thank-you/index.html          # Form submission success
├── 404/index.html                # Error page with WhatsApp CTA
├── services/                     # 23 service pages
├── location/                     # 8 location pages
├── assets/
│   ├── css/
│   │   ├── main.css              # Compiled styleguide
│   │   └── critical.css          # Inline critical CSS for LCP
│   ├── js/
│   │   ├── main.js               # WhatsApp pre-fill, location, banner dismiss
│   │   └── schema.js             # Dynamic JSON-LD injection
│   └── img/                      # Images directory
├── sitemap.xml                   # Auto-generated sitemap
├── robots.txt                    # Crawl directives
└── README.md                     # This file
```

## Contact
Dev questions: plumbing@six7.lk
Emergency escalation: +94 75 824 4216

## Deployment
1. Initialize git: `git init && git add . && git commit -m "Initial commit"`
2. Add remote: `git remote add origin https://github.com/six7/plumbing-web.git`
3. Push: `git push -u origin main`
4. Connect to Vercel/GitHub Pages for auto-deployment

## Key Features
- **WhatsApp Pre-fill**: All WhatsApp links auto-populate with service/location context
- **Sticky Mobile CTAs**: Fixed bottom bar with Call + WhatsApp buttons (mobile only)
- **Payment Banner**: Sticky top banner with payment policy reminder
- **Form Validation**: Phone number validation for Sri Lankan format (+94XXXXXXXXX)
- **Schema.org**: Dynamic JSON-LD injection based on page type
- **Critical CSS**: Inlined for fast LCP (< 2.5s target)

## Color Palette
- Primary: #0d4a6b (Deep blue — trust, plumbing)
- Accent: #e63946 (Urgent red — emergency CTA)
- WhatsApp: #25D366 (Official WhatsApp green)
- Warning: #ffc107 (Payment reminder banner)

## License
© 2026 Six7 Plumbing. All rights reserved.
