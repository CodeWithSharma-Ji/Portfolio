// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });
  }

  // Close menu when a link is clicked
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', function () {
      if (navLinks) {
        navLinks.classList.remove('active');
      }
    });
  });

  // Set active navigation link based on current page
  setActiveNavLink();

  // Show enlarged circular profile image on avatar click
  setupAvatarPopup();
});

// Function to set active navigation link
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    // Allow normal behavior for empty hashes or missing targets.
    if (!href || href === '#') {
      return;
    }

    const target = document.querySelector(href);
    if (!target) {
      return;
    }

    e.preventDefault();
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeIn 0.6s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all cards and items for animation
document.querySelectorAll('.card, .education-item, .project-card').forEach(element => {
  element.style.opacity = '0';
  observer.observe(element);
});

function setupAvatarPopup() {
  const avatar = document.querySelector('.logo-avatar');
  if (!avatar) {
    return;
  }

  const modal = document.createElement('div');
  modal.className = 'avatar-modal';
  modal.innerHTML = `<img src="${avatar.getAttribute('src')}" alt="${avatar.getAttribute('alt') || 'Profile'}" class="avatar-modal-image">`;
  document.body.appendChild(modal);

  const openModal = () => {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  avatar.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    openModal();
  });

  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}
