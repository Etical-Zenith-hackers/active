# Zenith Hackers Intelligence — GitHub Pages

Upload `index.html` and the `assets` folder to the root of a GitHub repository.

## Publish
Repository → Settings → Pages → Deploy from branch → `main` → `/ (root)`.

The page is responsive and includes the screenshot-derived visual background, animated sections, WhatsApp floating button and a FormSubmit contact form.

Before publishing, verify that the phone number, email addresses, address, testimonials and success metrics are authorized and accurate for public use.


## Visitor consent prompt
The visitor prompt is now fully client-side:
- **Allow** immediately closes the popup, remembers the choice, and submits a basic visitor event to FormSubmit in a hidden iframe.
- **No thanks** immediately closes the popup and remembers the choice.
- The prompt will not appear again on that browser unless its local storage is cleared.

If FormSubmit has not yet been activated for `zenithintel@consultant.com`, the popup will still close correctly, but the email notification will not be delivered until the FormSubmit recipient is activated.


## Updated supplied backgrounds
The Asset Recovery page now uses the three supplied Zenith images locally:
- `assets/asset-tracing-hero.jpg` — hero background
- `assets/asset-tracing-office.jpg` — investigation/intro and visual-break background
- `assets/asset-tracing-security.jpg` — legal/limitations section background

The recovery language explicitly says **recovery is not guaranteed**.


## Final background setup
The only image assets retained are the three supplied images:
- `assets/asset-tracing-hero.jpg`
- `assets/asset-tracing-office.jpg`
- `assets/asset-tracing-security.jpg`

All HTML image/background references use cache-busting query version `v=20260915`.
The visitor Allow/No thanks popup and visitor-notification form have been removed.

For GitHub Pages, upload the entire repository contents. If an older version still appears once, use a hard refresh or wait for GitHub Pages/CDN cache propagation.


## Live chat
A free Tawk.to live-chat launcher is prepared on both pages. Paste your unique Tawk.to widget snippet where marked in each HTML file. See `LIVE-CHAT-SETUP.txt`.


### Live Chat
Tawk.to live chat is installed on `index.html`, `asset-recovery.html`, and `blog.html` using the supplied widget code.


Tawk live chat: installed on index.html, asset-recovery.html, and blog.html. The Zenith LIVE CHAT button uses Tawk_API.toggle()/maximize() after the Tawk API becomes available and does not navigate to #live-chat.

## Supabase shared blog
The blog is now connected to Supabase for shared public posts and comments.
Run `supabase-schema.sql` once in the Supabase SQL Editor before publishing.
The site uses only the public Supabase publishable key in `supabase-config.js`.
Never place a Supabase secret/service-role key in the website.
