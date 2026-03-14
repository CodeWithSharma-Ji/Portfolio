# Sonu Kumar Sharma Portfolio

A responsive multi-page portfolio website built with HTML, CSS, and vanilla JavaScript.

This site presents Sonu Kumar Sharma's profile, skills, education, certifications, projects, and contact details with a shared navigation system, light/dark theme support, and mobile-friendly layouts.

## Current Website Sections

- `index.html` - homepage with introduction, strengths, and quick links
- `about.html` - personal summary, key skills, and certification highlights
- `projects.html` - featured project showcase with live and GitHub links
- `technologies.html` - frontend, backend, tools, and proficiency sections
- `education.html` - formal education, learning summary, and featured certificate viewer
- `contact.html` - contact details and EmailJS-ready contact form

## Current Features

- responsive multi-page layout
- shared navbar across all pages
- light and dark theme toggle with saved preference
- active navigation highlighting
- mobile hamburger menu with animated open state
- clickable profile avatar preview modal
- featured cybersecurity certificate with view-only modal preview
- animated cards and section reveal effects
- EmailJS-ready contact form

## Current Assets

- `assets/IMG_20251124_122340.jpg` - navbar/profile logo image
- `assets/cyber-security-certificate.jpeg` - featured certificate preview

## Tech Stack

- HTML5
- CSS3
- JavaScript
- EmailJS Browser SDK

## Project Structure

```text
Portfolio/
|-- assets/
|   |-- cyber-security-certificate.jpeg
|   `-- IMG_20251124_122340.jpg
|-- js/
|   |-- contact.js
|   |-- main.js
|   `-- theme-init.js
|-- styles/
|   `-- style.css
|-- about.html
|-- contact.html
|-- education.html
|-- index.html
|-- projects.html
|-- technologies.html
`-- README.md
```

## Local Usage

No build step is required.

1. Open `index.html` in a browser.
2. Navigate through the pages to verify layout, theme switching, mobile navigation, and modal previews.
3. Open `education.html` and use the certificate button to test the certificate viewer.
4. Open `contact.html` to test the contact form UI.

## Contact Form Setup

The contact form uses EmailJS, but the repo still contains placeholder keys.

Update `js/contact.js` with your real values:

```js
const EMAILJS_CONFIG = {
  publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
  serviceId: "YOUR_EMAILJS_SERVICE_ID",
  templateId: "YOUR_EMAILJS_TEMPLATE_ID"
};
```

After replacing the placeholders, the contact form can send messages directly from the website.

## Current Content Snapshot

- featured project: Garbage Reporting System
- featured certificate: Program in Cyber Security
- current education highlight: BCA at KCC Institute of Legal and Higher Education

## Files To Customize

- update page content in the HTML files
- update the main design system in `styles/style.css`
- update shared interactions in `js/main.js`
- update EmailJS settings in `js/contact.js`
- replace images inside `assets/` when needed

## Notes

- this is a static website and can be hosted on GitHub Pages, Netlify, Vercel, or any static host
- the contact form will not send messages until valid EmailJS credentials are added
- the certificate preview is view-only in the UI, but browsers cannot fully prevent screenshots or determined downloads

## Last Updated

March 14, 2026
