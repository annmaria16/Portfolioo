# Annmaria Susan Kurian – Portfolio

Static site: no build step, no dependencies.

## Folder
```
portfolio/
├── index.html
├── css/style.css
├── js/main.js
└── assets/
    ├── photo.jpg                      <- ADD YOUR PHOTO HERE (portrait, ~800x1000)
    ├── photo-placeholder.svg          (shown until photo.jpg exists)
    ├── Annmaria_Susan_Kurian_Resume.pdf
    └── favicon.svg
```

## Customise
- **Photo:** save your picture as `assets/photo.jpg`.
- **Accent colour:** edit `--accent` at the top of `css/style.css`.
- **Project links:** in `index.html` search for `github.com/annmaria16` inside each project and
  replace with that repo's URL; add a "Live Demo" button the same way once deployed.
- **Resume:** replace the PDF in `assets/` (keep the same file name or update the links).

## Host for free
**GitHub Pages:** create repo `annmaria16.github.io`, upload these files, then Settings → Pages → Deploy from `main` / root.
**Netlify:** drag-and-drop the whole folder at app.netlify.com/drop.
**Vercel:** `vercel` in this folder, or import the GitHub repo.
