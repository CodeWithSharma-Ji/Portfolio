document.addEventListener('DOMContentLoaded', function () {
  initializeTheme();

  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });
  }

  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', function () {
      if (navLinks) {
        navLinks.classList.remove('active');
      }
    });
  });

  setActiveNavLink();

  setupAvatarPopup();
  setupThemeToggle();
  setupNavbarSparkles();
  setupRevealAnimations();
});

function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
}

function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const theme = savedTheme || systemTheme;
  document.documentElement.setAttribute('data-theme', theme);
}

function setupThemeToggle() {
  const navRight = document.querySelector('.nav-right');
  if (!navRight || document.querySelector('.theme-toggle')) {
    return;
  }

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'theme-toggle';
  button.setAttribute('aria-label', 'Toggle color theme');
  button.setAttribute('title', 'Toggle light and dark mode');

  const menuToggle = navRight.querySelector('.menu-toggle');
  if (menuToggle) {
    navRight.insertBefore(button, menuToggle);
  } else {
    navRight.appendChild(button);
  }

  const syncToggleLabel = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    button.textContent = currentTheme === 'dark' ? '☀' : '☾';
    button.setAttribute('aria-pressed', String(currentTheme === 'dark'));
    button.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
    button.setAttribute('title', `Switch to ${nextTheme} mode`);
  };

  button.addEventListener('click', function () {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    syncToggleLabel();
  });

  syncToggleLabel();
}

function setupNavbarSparkles() {
  const navbarButtons = document.querySelectorAll('.nav-links a, .theme-toggle');
  if (!navbarButtons.length) {
    return;
  }

  navbarButtons.forEach(button => {
    button.addEventListener('pointerdown', function (event) {
      if (document.documentElement.getAttribute('data-theme') !== 'dark') {
        return;
      }

      createNavbarSparkles(button, event);
    });
  });
}

function createNavbarSparkles(button, event) {
  const rect = button.getBoundingClientRect();
  const originX = event.clientX - rect.left;
  const originY = event.clientY - rect.top;
  const sparkCount = 7;

  for (let index = 0; index < sparkCount; index += 1) {
    const sparkle = document.createElement('span');
    sparkle.className = 'nav-sparkle';
    sparkle.style.left = `${originX}px`;
    sparkle.style.top = `${originY}px`;

    const angle = (Math.PI * 2 * index) / sparkCount + Math.random() * 0.45;
    const distance = 14 + Math.random() * 18;
    sparkle.style.setProperty('--spark-x', `${Math.cos(angle) * distance}px`);
    sparkle.style.setProperty('--spark-y', `${Math.sin(angle) * distance}px`);
    sparkle.style.setProperty('--spark-size', `${4 + Math.random() * 6}px`);
    sparkle.style.setProperty('--spark-rotate', `${Math.floor(Math.random() * 90)}deg`);

    button.appendChild(sparkle);
    sparkle.addEventListener('animationend', function () {
      sparkle.remove();
    });
  }
}

function setupRevealAnimations() {
  const revealItems = document.querySelectorAll('.card, .education-item, .project-card');
  if (!revealItems.length || !('IntersectionObserver' in window)) {
    return;
  }

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

  revealItems.forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
  });
}

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
