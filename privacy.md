---
layout: page
title: Privacy notice
description: >-
  How petr.joachim.cz handles personal data: no cookies, cookieless
  analytics, Cal.com bookings and email. Your rights under the GDPR.
permalink: /privacy/
lead: >-
  This site sets no cookies and collects as little personal data as
  possible. This notice explains what is processed, why, and your rights
  under the EU General Data Protection Regulation (GDPR).
updated: 2026-11-03
---
{% comment %}
  DRAFT written by Claude Code. Petr must review it (ideally with a privacy
  professional) before launch. Check in particular: the controller details,
  Cal.com's sub-processors and transfer safeguards, the analytics setup and
  the retention periods.
{% endcomment %}

*Last updated: {{ page.updated | date: "%-d %B %Y" }}*

## Who is responsible

The data controller is **{{ site.business.name }}**
{%- if site.business.place != "" %}, {{ site.business.place }}{% endif %}
{%- if site.business.ico != "" %}, IČO {{ site.business.ico }}{% endif %}.
For any privacy question or request, email {% include email.html %}.

## Visiting the website

The site is hosted on GitHub Pages (GitHub, Inc.). When you load a page,
GitHub's servers process technical data such as your IP address and browser
details to deliver the page and keep the service secure. GitHub may log
this data for a limited time. See the
[GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).

- **Legal basis:** legitimate interest in running a secure website
  (Art. 6(1)(f) GDPR).
- **Cookies:** the site itself sets no cookies and uses no local storage.

## Analytics

{% if site.analytics.enabled -%}
To understand how many people visit and which pages help them, the site uses
[GoatCounter](https://www.goatcounter.com/), a privacy-friendly analytics
service. GoatCounter sets no cookies and does not store IP addresses or build
profiles of individual visitors. It records aggregated data such as the page
visited, the referring site, browser and screen size, country, and clicks on
the "Book a free intro call" button.
{%- else -%}
The site does not currently use any analytics. If cookieless analytics such
as [GoatCounter](https://www.goatcounter.com/) is added later, this section
will describe it; it will not set cookies or store IP addresses.
{%- endif %}

- **Legal basis:** legitimate interest in understanding how the site is used
  (Art. 6(1)(f) GDPR).

## Booking a call

Intro calls are booked through [Cal.com](https://cal.com/) (Cal.com, Inc.),
embedded on the [booking page]({{ '/contact/' | relative_url }}) only. When
you book, Cal.com processes the details you enter (name, email address, any
notes and the chosen time) and technical data needed to run the booking
widget. Cal.com acts as a processor on my behalf and sends the booking to my
calendar. Its scripts load only on the booking page.

Cal.com is based in the United States, so your data may be transferred
outside the EU. Such transfers rely on appropriate safeguards, such as the
EU Standard Contractual Clauses. See the
[Cal.com Privacy Policy](https://cal.com/privacy).

- **Legal basis:** steps taken at your request before entering into a
  contract (Art. 6(1)(b) GDPR).

## Email and other correspondence

When you email me or contact me on LinkedIn, I process your name, contact
details and whatever you write, to reply and to arrange any cooperation.

- **Legal basis:** steps taken at your request before entering into a
  contract (Art. 6(1)(b) GDPR), or my legitimate interest in replying to your
  message (Art. 6(1)(f) GDPR).

## How long data is kept

- **Booking details and correspondence** that do not lead to cooperation:
  up to 2 years after our last contact, then deleted.
- **Client records and invoices:** for as long as Czech accounting and tax
  law requires, typically 5 to 10 years.
- **Hosting logs and analytics:** according to GitHub's and GoatCounter's
  own retention periods; analytics data is aggregated and not linked to you.

I do not sell personal data, use it for advertising, or make automated
decisions about you.

## Your rights

Under the GDPR you have the right to:

- access the personal data I hold about you
- have it corrected or deleted
- restrict or object to its processing, including processing based on
  legitimate interest
- receive it in a portable format
- lodge a complaint with a supervisory authority. In the Czech Republic this
  is the [Office for Personal Data Protection (ÚOOÚ)](https://uoou.gov.cz/).

To exercise any of these rights, email {% include email.html %}. I will
reply within one month.
