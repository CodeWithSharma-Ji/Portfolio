# Sonu Kumar Sharma Portfolio

A premium, responsive, and modern multi-page portfolio website built with HTML5, CSS3, and vanilla JavaScript. 

This site is designed to showcase Sonu Kumar Sharma's technical expertise, projects, and professional background. It features a robust, conflict-free BEM-inspired CSS architecture, dynamic theme switching, and seamless responsive layouts.

## Key Features

- **Unique BEM-inspired CSS System**: All classes are securely namespaced with a `pf-` prefix to prevent any conflicts with future third-party libraries.
- **Dynamic Theme Switcher**: A fully functional light/dark mode toggle that persists user preference via `localStorage` and gracefully syncs UI elements.
- **Responsive Navigation**: A standardized, unified navbar across all pages ensuring perfect visual alignment on both desktop and mobile devices.
- **Bento Box UI Components**: Modern, glassmorphism-styled cards that highlight content with interactive hover glows.
- **EmailJS Integration**: A fully functional, backend-less contact form.

## Project Structure

```text
Portfolio/
|-- assets/
|   |-- cyber-security-certificate.jpeg
|   `-- IMG_20251124_122340.jpg
|-- js/
|   |-- contact.js       # EmailJS form submission logic
|   |-- main.js          # Core UI, Theme Toggle, and Component logic
|   `-- theme-init.js    # Prevents FOUC (Flash of Unstyled Content) during theme load
|-- styles/
|   `-- style.css        # Centralized stylesheet with prefixed architecture
|-- index.html           # Homepage & Hero Section
|-- about.html           # Education, Skills, and Bio (consolidated)
|-- projects.html        # Project Showcase
|-- contact.html         # Contact Form
`-- README.md
```

*Note: Legacy `technologies.html` and `education.html` pages have been successfully deprecated and consolidated to streamline the user experience.*

## Vercel Deployment Guide

This project is a 100% static site and is natively ready for seamless deployment to [Vercel](https://vercel.com). No build scripts or configurations are necessary.

1. **Push to GitHub**: Ensure your latest commits are pushed to your GitHub repository.
2. **Import to Vercel**: Log into Vercel and click **Add New Project**.
3. **Select Repository**: Select this repository from your GitHub account.
4. **Deploy**: Leave all framework presets and build commands empty (Vercel automatically detects static HTML). Click **Deploy**.

Vercel will build and serve your site globally within seconds. Any future commits to the `main` branch will trigger automatic deployments.

## Local Setup

No local build step is required.

1. Clone the repository.
2. Open `index.html` in your browser of choice.
3. Test the theme switcher, responsive layouts, and navigation.

## Contact Form Configuration (EmailJS)

To enable the contact form, you must supply your EmailJS credentials. Open `js/contact.js` and update the `EMAILJS_CONFIG` object:

```javascript
const EMAILJS_CONFIG = {
  publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
  serviceId: "YOUR_EMAILJS_SERVICE_ID",
  templateId: "YOUR_EMAILJS_TEMPLATE_ID"
};
```

## Last Updated

April 2026
