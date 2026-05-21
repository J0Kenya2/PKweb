# PokerKing Nairobi Website

Mobile-first static website for PokerKing Nairobi (HTML + CSS + JavaScript, no build step).

## Pages

| Page | File | Content |
|------|------|---------|
| Home | `index.html` | Compact hero, club highlights, address & social icons |
| Cash Games | `cash-games.html` | Stake levels (KES), insurance odds table |
| Tournaments | `tournaments.html` | Posters (from JSON), event details, registration form |
| Gallery | `gallery.html` | Club and tournament photos |
| Contact | `contact.html` | Full venue info, policies, social links |

## Local preview

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080` (use a local server so tournament JSON loads correctly).

## Site settings

Edit **`js/site-config.js`** for:

- Address, phone, email, hours
- WhatsApp / Instagram / TikTok URLs
- Tournament registration form endpoint

## Update tournaments (backend-lite)

Edit **`data/tournaments.json`**:

1. Set **`seriesPoster`** (one main poster image in `assets/`) and optional **`seriesTitle`**
2. Add or update items in **`events[]`** (title, date, time, venue, buyIn, description, `registrationOpen`)
3. Refresh the Tournaments page — users tap a schedule row to open the registration form

No code changes required for routine updates.

## Tournament registration form

Set `registrationEndpoint` in `js/site-config.js` to one of:

- **Formspree**: `https://formspree.io/f/YOUR_FORM_ID` (submissions appear in Formspree dashboard / email)
- **Google Apps Script** web app URL connected to a Google Sheet
- Any POST endpoint that accepts `multipart/form-data` fields: `name`, `phone`, `email`, `tournament`, `notes`

Until configured, the form shows a setup reminder instead of sending data.

## File structure

```
index.html
cash-games.html
tournaments.html
gallery.html
contact.html
css/styles.css
js/site-config.js
js/main.js
data/tournaments.json
assets/
```

## Design notes

- Sticky header + always-visible sub-navigation (no hamburger menu)
- Compact hero on mobile (~38vh) so contact info is visible with minimal scrolling
- Black & gold palette aligned with brand logo
