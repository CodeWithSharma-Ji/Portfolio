# Sonu Sharma - Professional Portfolio

A modern, multi-page portfolio website built with pure HTML, CSS, and JavaScript. Showcase your achievements, projects, technologies, and educational background in a professional and interactive manner.

## 🌟 Features

- **Multi-page Architecture**: Organized content across 5 main pages
- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Modern UI**: Sleek gradient styles with smooth animations
- **Interactive Elements**: Smooth scrolling, animations, and hover effects
- **Navigation System**: Easy-to-use navigation with mobile menu toggle
- **Performance Optimized**: Fast-loading pages with minimal dependencies
- **Pure Technologies**: Built with raw HTML, CSS, and JavaScript (no frameworks)

## 📂 Project Structure

```
Portfolio/
├── index.html                 # Home page
├── about.html                 # About & Achievements
├── projects.html              # Portfolio projects
├── technologies.html          # Tech stack & skills
├── education.html             # Education & certifications
├── styles/
│   └── style.css             # Main stylesheet (responsive design)
├── js/
│   └── main.js               # JavaScript for interactivity
├── assets/                    # Folder for future images/files
└── README.md                  # This file
```

## 📄 Pages Overview

### 1. **index.html** - Home Page
- Welcome section with hero content
- Quick overview of your capabilities
- Call-to-action buttons
- Quick links to other sections

### 2. **about.html** - About & Achievements
- Personal bio and introduction
- List of achievements and awards
- Key skills overview
- Professional highlights

### 3. **projects.html** - Projects Portfolio
- Featured project cards
- Project descriptions and tech stacks
- Links to projects and GitHub repositories
- Grid layout showcasing up to 6 projects

### 4. **technologies.html** - Tech Stack
- Frontend technologies (HTML, CSS, JavaScript, React, Vue.js, etc.)
- Backend technologies (Node.js, Express, Python, Databases, etc.)
- Tools & DevOps (Git, Docker, Webpack, etc.)
- Proficiency levels and skill assessments

### 5. **education.html** - Education & Certifications
- Formal education (Bachelor's degree, high school)
- Professional certifications (AWS, JavaScript, etc.)
- Online courses and training programs
- Learning path summary

## 🎨 Design Features

### Color Scheme
- **Primary Color**: #667eea (Purple-blue)
- **Secondary Color**: #764ba2 (Purple)
- **Accent Color**: #f093fb (Pink)
- **Text Dark**: #2d3748 (Dark gray)
- **Background**: #f7fafc (Light gray)

### Key Styling Features
- Gradient backgrounds and text effects
- Smooth animations and transitions
- Card-based layout with hover effects
- Responsive grid system
- Mobile-first design approach

## 🛠️ Customization Guide

### Update Personal Information
Edit the following fields in all HTML files:
```html
<!-- Name in header -->
<a href="index.html" class="logo">Your Name</a>

<!-- Social links in footer -->
<a href="https://github.com/your-username" target="_blank">GitHub</a>
<a href="https://linkedin.com/in/your-profile" target="_blank">LinkedIn</a>
<a href="mailto:your.email@example.com">Email</a>
```

### Add Your Projects
Edit `projects.html` to add your own projects by duplicating the project-card structure:
```html
<div class="project-card">
  <div class="project-image">🚀</div>
  <div class="project-content">
    <h3>Your Project Title</h3>
    <p>Project description...</p>
    <div class="tech-tags">
      <span class="tech-tag">Technology 1</span>
      <span class="tech-tag">Technology 2</span>
    </div>
    <div class="project-links">
      <a href="#">View Project</a>
      <a href="#">GitHub</a>
    </div>
  </div>
</div>
```

### Modify Color Scheme
Update the CSS variables in `styles/style.css`:
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --accent-color: #f093fb;
  /* ... other colors ... */
}
```

### Update Your Tech Stack
Edit `technologies.html` to add your specific technologies and proficiency levels.

### Customize Achievements
Update the achievement items in `about.html` with your specific accomplishments.

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above - Full 3-column grid layouts
- **Tablet**: 768px to 1200px - 2-column layouts
- **Mobile**: Below 768px - Single column with mobile menu toggle

## ✨ JavaScript Features

### Mobile Menu Toggle
- Hamburger menu for mobile devices
- Smooth transitions and responsive behavior

### Active Navigation Link
- Automatically highlights the current page in navigation
- Updates based on the URL

### Smooth Scrolling
- Anchor links with smooth scroll behavior
- Enhanced user experience

### Scroll Animations
- Cards and sections animate in as they come into view
- Uses Intersection Observer API for performance

## 🚀 Getting Started

1. **Extract Files**: Place all files in your web server directory
2. **Customize Content**: Edit each HTML file with your personal information
3. **Update Images**: Add your own images to the assets folder (optional)
4. **Test Locally**: Open `index.html` in your browser
5. **Deploy**: Upload to your web hosting service

### Local Testing
Simply open `index.html` in your web browser. No build tools or server required!

## 💡 Tips for Best Results

1. **Keep it Updated**: Regularly update your projects and achievements
2. **Profile Links**: Ensure all social media links are correct
3. **Project Details**: Make project descriptions clear and impactful
4. **SEO**: Update `<title>` tags and meta descriptions for each page
5. **Performance**: Portfolio loads quickly with minimal dependencies

## 🔄 Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 File Sizes

- `styles/style.css`: ~20 KB (including responsive design)
- `js/main.js`: ~3 KB (lightweight interactivity)
- Each HTML page: ~8-12 KB (content-dependent)

**Total size**: < 100 KB (very fast loading!)

## 🔐 Security & Best Practices

- No external dependencies or CDN required
- All code is locally hosted
- No tracking or analytics (by default)
- HTTPS recommended for deployment

## 📧 Contact & Social Links

Update these in the footer of all pages:
- GitHub profile
- LinkedIn profile
- Twitter/X profile
- Email address

## 🎯 Next Steps

1. Customize all content with your personal information
2. Add your real projects with accurate descriptions
3. Update your education and certifications
4. Add high-quality images to assets folder
5. Test all links and navigation
6. Deploy to your hosting platform

## 📄 License

This portfolio template is free to use and customize for personal purposes.

---

**Built with ❤️ using HTML, CSS, and JavaScript**

Last Updated: February 2026
