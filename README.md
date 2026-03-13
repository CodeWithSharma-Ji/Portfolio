# Sonu Kumar Sharma Portfolio

A responsive multi-page portfolio website built with HTML, CSS, and JavaScript. The site presents Sonu Kumar Sharma's profile, skills, projects, education, certifications, and contact details in a clean light/dark theme experience.

## Overview

This portfolio is a static website with:

- a dedicated home page
- an about page with skills and certifications
- a projects page with live project and GitHub links
- a technologies page with categorized tech stacks
- an education page with academic and certification details
- a contact page with an EmailJS-powered contact form

## Pages

- `index.html` - landing page, value proposition, and quick links
- `about.html` - bio, key skills, and certifications
- `projects.html` - featured project showcase and GitHub call-to-action
- `technologies.html` - frontend, backend, tools, and proficiency sections
- `education.html` - formal education, certification summary, and learning path
- `contact.html` - contact details and working contact form UI

## Features

- responsive multi-page layout
- light and dark theme toggle with saved preference
- dark-mode interaction effects for navbar, call-to-action buttons, and project links
- mobile navigation menu
- active navigation highlighting
- profile avatar popup preview
- scroll-in card animations
- EmailJS contact form integration

## Tech Stack

- HTML5
- CSS3
- JavaScript
- EmailJS Browser SDK

## Project Structure

```text
Portfolio/
|-- about.html
|-- contact.html
|-- education.html
|-- index.html
|-- projects.html
|-- technologies.html
|-- IMG_20251124_122340.jpg
|-- README.md
|-- js/
|   |-- contact.js
|   |-- main.js
|   `-- theme-init.js
`-- styles/
    `-- style.css
```

## Local Setup

No build step is required.

1. Open `index.html` in a browser.
2. Navigate through the pages to verify links, theme toggle, and animations.
3. If you want the contact form to send real emails, configure EmailJS in `js/contact.js`.

## EmailJS Setup

Update the values in `js/contact.js`:

```js
const EMAILJS_CONFIG = {
  publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
  serviceId: "YOUR_EMAILJS_SERVICE_ID",
  templateId: "YOUR_EMAILJS_TEMPLATE_ID"
};
```

After replacing those placeholders with real EmailJS values, the contact form can send messages directly from the site.

## Customization

### Update content

- edit page text in the HTML files
- replace project links in `projects.html`
- update education and certification details in `education.html` and `about.html`
- update footer and contact links across the pages

### Update styling

Theme colors, animations, layout, and responsive rules live in `styles/style.css`.

### Update interactions

Shared site behavior lives in `js/main.js`.

Theme initialization before page paint is handled by `js/theme-init.js`.

## Notes

- The website is fully static, so it can be hosted on GitHub Pages, Netlify, Vercel, or any basic web host.
- The contact form UI works without a backend, but actual email sending requires valid EmailJS credentials.
- The current design includes stronger motion effects in dark mode and calmer styling in light mode.

## Last Updated

March 13, 2026
