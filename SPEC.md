# petr.joachim.cz — Website Spec (Jekyll + GitHub Pages)

Nov 3, 2026 · @Petr Joachim

## Purpose and goals

The site exists to turn LinkedIn visitors and referrals into booked intro calls for Petr's coaching, advisory and fractional CTO work. Everything else is secondary.

**Primary goal:** a visitor understands within 10 seconds who Petr helps, why he is credible, and how to book a call.

**Target audiences, in priority order:**

1. CTOs, VPs of Engineering and engineering managers at Series A–C scaleups (coaching clients)
2. Founders and CEOs who need senior tech leadership without a full-time hire (advisory and fractional buyers)
3. HR and L&D leads buying coaching for their engineering managers

**Success metrics:**

- Intro calls booked per month (main metric)
- Click-through from homepage to booking page
- Visitors arriving from LinkedIn

**Positioning line (use across the site, consistent with LinkedIn):** Engineering Leadership Coach & Fractional CTO. Former CTO and VP of Engineering, coaching tech leaders since 2019.

**Primary language:** English. Most buyers are international and work in English.

## Tech stack and hosting

A static Jekyll site, built by GitHub Actions and served by GitHub Pages on the existing domain **petr.joachim.cz**.

| Area | Requirement |
| --- | --- |
| Generator | Jekyll 4.x, Ruby version pinned in `.ruby-version` |
| Build | GitHub Actions workflow (not the legacy Pages build), so any Jekyll plugin can be used |
| Hosting | GitHub Pages, deployed from the Actions artifact |
| Domain | `petr.joachim.cz` via `CNAME` file + DNS CNAME record to `<username>.github.io`; HTTPS enforced |
| Plugins | `jekyll-seo-tag`, `jekyll-sitemap`, `jekyll-feed`, `jekyll-redirect-from` |
| Styling | Hand-written SCSS compiled by Jekyll; no CSS framework |
| JavaScript | None required; small vanilla JS only where needed (mobile menu) |
| Fonts | Self-hosted WOFF2 files, no Google Fonts CDN (GDPR) |
| Theme | No third-party theme; custom layouts so the design is fully owned |

**Constraints for Claude Code:**

- No build tools beyond Jekyll itself (no npm, no Node bundlers).
- No external scripts except the booking embed, and only on the booking page.
- The site must build locally with `bundle exec jekyll serve` and in CI with the same Gemfile.
- Content lives in Markdown and YAML `_data` files, so Petr can edit text without touching layouts.

## Site map and page content

Six core pages, every one ending in the same call to action: **Book a free intro call**. The `/contact/` URL must stay, because the LinkedIn profile already links to it.

| Page | URL | Job of the page |
| --- | --- | --- |
| Home | `/` | Positioning, proof, and a path to booking in one scroll |
| Coaching | `/coaching/` | 1:1 leadership coaching for engineering leaders |
| Advisory & Fractional CTO | `/fractional-cto/` | Retainers and part-time CTO / VP Engineering work for founders |
| About | `/about/` | Petr's story, career, psychology background, photo |
| Book a call | `/contact/` | Cal.com booking embed, email, LinkedIn |
| Privacy | `/privacy/` | GDPR privacy notice |
| Writing (phase 2) | `/writing/` | Articles on engineering leadership; built but hidden from nav until the first post exists |
| 404 | `/404.html` | Friendly message + link home and to booking |

Redirect `/call/` → `/contact/` (short link for posts and slides).

### Home

1. **Hero:** headline "I help CTOs and engineering leaders build teams that ship", subline with the positioning line, primary button to `/contact/`, secondary link to `/coaching/`.
2. **Proof strip:** four short facts — coached through Kiwi.com's growth from 60 to 450 developers; led up to 50 engineers at IP Fabric; cut a release cycle from 100 days to one week; coaching engineering leaders since 2019.
3. **Who I work with:** three cards for the three audiences in Purpose and goals.
4. **Ways to work together:** three cards — Coaching, Advisory retainer, Fractional CTO — each linking to its page.
5. **How it starts:** three steps — free 30-minute intro call, agreed goals and format, regular sessions.
6. **Testimonials:** 2–3 quotes from `_data/testimonials.yml` (hidden if the file is empty).
7. **Short about teaser:** photo, two sentences, link to `/about/`.
8. **Final call to action** block.

### Coaching

- Who it is for: new team leads, engineering managers, directors, first-time CTOs and VPs of Engineering.
- Typical topics: stepping into a bigger role, building a leadership team, delivery under pressure, difficult conversations, engineer-to-manager transition.
- Format: packages of 6–10 sessions, 60 minutes, remote or in person in Brno and Prague; English, Czech, Slovak.
- Pricing block driven by `_data/offers.yml` (shown or hidden by a flag — see Open decisions).
- FAQ: 5–6 questions from `_data/faq_coaching.yml` (confidentiality, company-paid coaching, invoicing, cancellations).

### Advisory & Fractional CTO

- Advisory retainer: monthly sparring for founders and CEOs, sessions plus async access.
- Fractional CTO / VP Engineering: 1–2 days a week, for companies between hires or scaling fast.
- Typical situations: "engineering feels slow and I can't tell why", first engineering managers, roadmap and delivery alignment with product, a founder growing into CEO.
- One anonymized example engagement per offer (from Moravio and ThreatMark experience).

### About

- Story in first person: developer at Seznam.cz → full-time leadership coach at Kiwi.com → CTO at Moravio → VP of Engineering at ThreatMark → Director of Product Engineering at IP Fabric.
- Career shown as a vertical timeline from `_data/career.yml`, newest first.
- Psychology studies at Masaryk University; languages; location.
- Professional photo.

### Book a call

- Cal.com inline embed for the 30-minute intro call.
- Fallback for visitors with scripts blocked: a plain link to the Cal.com page and the email address.
- One line on what to expect from the call.

## Design direction

Calm, editorial and senior: it should feel like a trusted advisor's site, not a startup landing page or a coaching template.

| Element | Direction |
| --- | --- |
| Overall feel | Lots of whitespace, few elements per screen, strong typography doing most of the work |
| Typography | Serif for headings (e.g. Source Serif 4), clean sans-serif for body (e.g. Inter); both open-licensed and self-hosted |
| Body text | 18px base, line length max \~68 characters, line height 1.6 |
| Colors | Warm off-white background, near-black ink text, one accent color for buttons and links (deep teal suggested); all as CSS custom properties |
| Dark mode | Full support via `prefers-color-scheme`, same tokens redefined |
| Imagery | Real photos of Petr only; no stock photos, no illustrations of people; simple line icons at most |
| Layout | Mobile-first, single column on phones, max content width \~1100px on desktop |
| Buttons | One primary style (accent fill) used only for "Book a free intro call"; secondary actions as text links |
| Motion | None beyond subtle hover states; respect `prefers-reduced-motion` |

**Consistency:** reuse the headline, positioning line and proof points from the LinkedIn profile word for word, so a visitor moving between the two sees one story.

## Features

**Booking.** Cal.com inline embed on `/contact/` only. The Cal.com username and event slug live in `_config.yml` (`booking.cal_link`), so changing tools later means editing one value. Every call-to-action button links to `/contact/`, never straight to Cal.com.

**Contact.** No contact form in v1, because GitHub Pages has no backend. Show the email address (obfuscated against scrapers) and the LinkedIn profile link.

**Writing (phase 2).** A Jekyll `_posts` collection with an index at `/writing/`, RSS via `jekyll-feed`, and reading time. Hidden from navigation until the first post is published (`writing.enabled` flag in `_config.yml`).

**Languages.** English only in v1. Keep all page text in Markdown and `_data` files so a Czech version can be added later without changing layouts.

**SEO.**

- `jekyll-seo-tag` for titles, descriptions, Open Graph and Twitter cards; a unique description per page.
- One shared Open Graph image (1200×630) with name and positioning line, so LinkedIn shares look professional.
- JSON-LD structured data: `Person` (name, job title, LinkedIn as `sameAs`) and `ProfessionalService` (services, area served: Europe, languages).
- `jekyll-sitemap` and a `robots.txt`.

**Analytics.** Cookieless, privacy-friendly analytics only (e.g. Plausible or GoatCounter), so no cookie banner is needed. Track one event: clicks on "Book a free intro call". The analytics script is included only when `analytics.enabled` is true.

**Navigation.** Header: Coaching, Fractional CTO, About, and a "Book a call" button. Footer: email, LinkedIn, Privacy, copyright, and business details (name, place of business and IČO, which the Czech Civil Code §435 requires on a business website).

## Repo structure and conventions

Content and code are separated: Petr edits only Markdown pages and `_data` YAML files; layouts and styles stay stable.

```text
.
├── .github/workflows/pages.yml   # build with Jekyll, deploy to Pages
├── _config.yml                   # site settings, feature flags, booking link
├── _data/
│   ├── navigation.yml
│   ├── proof_points.yml          # homepage proof strip
│   ├── offers.yml                # coaching / advisory / fractional, prices + show flag
│   ├── testimonials.yml
│   ├── career.yml                # About timeline
│   └── faq_coaching.yml
├── _includes/                    # header, footer, cta, cards, seo-jsonld, analytics
├── _layouts/                     # default, home, page, post
├── _sass/                        # tokens (colors, type), base, components
├── _posts/                       # phase 2
├── assets/
│   ├── css/main.scss
│   ├── fonts/                    # self-hosted WOFF2
│   ├── img/                      # photos (WebP + JPG fallback), og-image.png
│   └── js/menu.js
├── index.md
├── coaching.md
├── fractional-cto.md
├── about.md
├── contact.md
├── privacy.md
├── writing/index.html            # phase 2
├── 404.html
├── robots.txt
├── CNAME                         # petr.joachim.cz
├── Gemfile
├── .ruby-version
└── README.md                     # how to run locally and edit content
```

**Conventions:**

- Feature flags in `_config.yml`: `writing.enabled`, `analytics.enabled`, `offers.show_prices`.
- Reusable components as includes with parameters (e.g. `{% include cta.html variant="block" %}`), not copy-pasted HTML.
- All colors, font sizes and spacing as CSS custom properties in `_sass/_tokens.scss`.
- Images: max 200 KB each, `width`/`height` set, `loading="lazy"` below the fold.
- `README.md` explains in plain steps how to change text, add a testimonial, and publish a post.

## Performance, accessibility and privacy

| Area | Requirement |
| --- | --- |
| Performance | Lighthouse mobile score ≥ 95 for Performance, Accessibility, Best Practices and SEO on every core page |
| Page weight | Homepage ≤ 500 KB total on first load, excluding the booking embed |
| Accessibility | WCAG 2.2 AA: color contrast ≥ 4.5:1 in both light and dark mode, visible focus states, semantic headings, alt text, skip-to-content link, full keyboard navigation |
| Responsive | Checked at 360px, 768px and 1280px widths; no horizontal scrolling |
| Privacy | No cookies set by the site itself; no third-party requests on any page except `/contact/` (Cal.com) and the cookieless analytics script |
| Privacy notice | `/privacy/` covers: data controller (Petr, with IČO), what Cal.com processes for bookings, analytics without cookies, email correspondence, retention, GDPR rights and contact |
| Security | HTTPS enforced; no secrets in the repo; Dependabot enabled for the Gemfile and Actions |

The privacy notice is draft content written by Claude Code and must be reviewed by Petr before launch.

## Build order and acceptance criteria

Claude Code builds in five steps and stops after each one for Petr's review. Save this spec as `SPEC.md` in the repo root and start with: *"Read SPEC.md. Build step 1 only, then stop and summarize what you did."*

1. **Scaffold:** Gemfile, `_config.yml`, GitHub Actions workflow, `CNAME`, base layout, tokens, fonts, README. Site builds locally and in CI with a placeholder homepage.
2. **Design system:** typography, colors (light and dark), header, footer, buttons, cards, CTA include. One style-guide page at `/styleguide/` (excluded from sitemap and nav) shows every component.
3. **Core pages:** Home, Coaching, Fractional CTO, About, Contact with the Cal.com embed, 404, all driven by `_data` files with real content from the LinkedIn profile.
4. **SEO, analytics and privacy:** seo-tag, JSON-LD, Open Graph image, sitemap, robots.txt, analytics behind a flag, privacy page draft, `/call/` redirect.
5. **Polish and checks:** Lighthouse and accessibility pass, responsive check, writing section scaffolded behind its flag.

**Launch checklist:**

- [ ] `bundle exec jekyll build` runs with no warnings, and the Actions deploy succeeds
- [ ] `https://petr.joachim.cz` serves the new site over HTTPS, and `/contact/` keeps working
- [ ] Every page has a visible "Book a free intro call" path in at most one click
- [ ] Cal.com embed books a test call end to end
- [ ] Lighthouse mobile ≥ 95 on all four categories for every core page
- [ ] Light and dark mode both pass contrast checks
- [ ] No cookies set, no third-party requests outside `/contact/` and analytics (checked in browser dev tools)
- [ ] LinkedIn share preview shows the correct title, description and image
- [ ] Footer shows name, place of business and IČO
- [ ] Petr has reviewed all copy, testimonials (with each person's permission) and the privacy notice

## Open decisions for Petr

Decide these before step 3; the defaults below are what Claude Code uses if nothing changes.

| Decision | Default | Alternative |
| --- | --- | --- |
| Show prices on the site? | Hidden; "packages from €1,200" on the coaching page only | Full price list, or no numbers at all |
| Existing site content | Replaced entirely; old URLs other than `/contact/` redirect to the homepage | Keep specific old pages or posts |
| Accent color | Deep teal | Another color matching your LinkedIn banner |
| Analytics tool | GoatCounter (free for personal use) | Plausible (paid) or none |
| Testimonials | Use 2–3 LinkedIn recommendations, with permission | Launch without, add later |
| Professional photo | New photo before launch | Current LinkedIn photo for now |
| Czech version | Not in v1 | Add `/cs/` pages in a later phase |
| Writing section | Built, hidden until first post | Launch with 1–2 posts |
