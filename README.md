# petr.joachim.cz

Personal site of Petr Joachim, built with Jekyll and served by GitHub Pages.
The full spec is in [SPEC.md](SPEC.md).

## Run locally

You need the Ruby version in `.ruby-version` and Bundler.

```bash
bundle install
bundle exec jekyll serve
```

Open http://localhost:4000. Pages reload when you save a file, except
`_config.yml`: stop the server (Ctrl+C) and start it again after editing it.

## Where things live

| What you want to change | Where |
| --- | --- |
| Site title, booking link, email, business details, feature flags | `_config.yml` |
| Homepage text (hero, audiences, steps, about teaser) | front matter at the top of `index.md` |
| Page text | `coaching.md`, `fractional-cto.md`, `about.md`, `contact.md`, `privacy.md` |
| Lists (proof points, offers and prices, testimonials, career, coaching FAQ, menu, closing call to action) | `_data/*.yml` |
| Photo, email, LinkedIn, Cal.com link, IČO | `_config.yml` |
| Colors, fonts, spacing | `_sass/_tokens.scss` |
| Photos | `assets/img/` (WebP + JPG, max 200 KB each) |

Layouts (`_layouts/`), components (`_includes/`) and styles (`_sass/`) do not
need to change when you edit text. Every component is shown at
http://localhost:4000/styleguide/ (not linked or indexed).

## Edit text

1. Open the page's `.md` file or the matching `_data/*.yml` file.
2. Change the text. Keep the indentation in YAML files as it is.
3. Check it locally with `bundle exec jekyll serve`.
4. Commit and push to `master`. The site deploys in about a minute.

## Add a testimonial

Get the person's permission first. Then add an entry to
`_data/testimonials.yml`:

```yaml
- quote: "What they said."
  name: Jane Doe
  role: CTO, Example Ltd
```

The homepage shows the testimonials section only when this file has entries.

## Publish a post (once the writing section is on)

1. Create `_posts/YYYY-MM-DD-short-title.md`:

   ```markdown
   ---
   title: The post title
   description: One sentence for search results and LinkedIn previews.
   ---

   Post text in Markdown.
   ```

2. Set `writing.enabled: true` in `_config.yml`. Until then the Writing
   page, posts and their sitemap and feed entries are left out of the build
   entirely (see `_plugins/writing_flag.rb`), so you can draft posts safely.
3. Commit and push. Posts appear at `/writing/<title>/` with a reading time.

## Quality checks

Every pull request runs Lighthouse (`.github/workflows/lighthouse.yml`) on the
core pages with mobile settings and fails if Performance, Accessibility, Best
Practices or SEO drops below 95. You can also start it by hand from the
Actions tab. Before launch, go through the launch checklist in `SPEC.md`.

## Analytics

The site uses cookieless [GoatCounter](https://www.goatcounter.com/). To turn
it on, create a GoatCounter site, then in `_config.yml` set
`analytics.enabled: true` and `analytics.goatcounter_code` to your site code
(the `xyz` in `xyz.goatcounter.com`). The script only loads on the live
site, not with `jekyll serve`. Clicks on "Book a free intro call" show up as
the `book-intro-call` event. The privacy page updates itself when you turn
analytics on.

## Share image (LinkedIn preview)

`assets/img/og-image.png` (1200×630) is made from `_design/og-image.svg`.
After editing the SVG, regenerate the PNG on a Mac:

```bash
d=$(mktemp -d) && sed -e 's/width="1200" height="630" viewBox="0 0 1200 630"/width="768" height="768" viewBox="0 -285 1200 1200"/' _design/og-image.svg > "$d/og.svg" && qlmanage -t -s 1200 -o "$d" "$d/og.svg" && sips -c 630 1200 "$d/og.svg.png" --out assets/img/og-image.png
```

Check the result with LinkedIn's
[Post Inspector](https://www.linkedin.com/post-inspector/) after deploying.

## Redirects

`/call/` and the old site's URLs redirect to the new pages. They are listed
under `redirect_from:` at the top of `contact.md`, `about.md` and `index.md`.

## Fonts

Inter and Source Serif 4 are self-hosted in `assets/fonts/` (SIL Open Font
License, see `OFL-*.txt`), so no request goes to Google Fonts.

## Deployment

`.github/workflows/pages.yml` builds the site on every push and pull request
and deploys `master` to GitHub Pages. One-time setup in the GitHub repo:
**Settings → Pages → Source: GitHub Actions**, custom domain
`petr.joachim.cz`, **Enforce HTTPS** on. DNS: a `CNAME` record for
`petr.joachim.cz` pointing to `petrjoachim.github.io`.
