document.addEventListener('DOMContentLoaded', function () {
  initializeTheme();
  setupNavigation();
  setActiveNavLink();
  setupAvatarPopup();
  setupThemeToggle();
  setupNavbarSparkles();
  setupRevealAnimations();
});

function setupNavigation() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  if (!menuToggle || !navLinks) {
    return;
  }

  if (!navLinks.id) {
    navLinks.id = 'primary-navigation';
  }

  menuToggle.setAttribute('role', 'button');
  menuToggle.setAttribute('tabindex', '0');
  menuToggle.setAttribute('aria-controls', navLinks.id);
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Toggle navigation menu');

  const setMenuState = function (isOpen) {
    navLinks.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  };

  menuToggle.addEventListener('click', function () {
    setMenuState(!navLinks.classList.contains('active'));
  });

  menuToggle.addEventListener('keydown', function (event) {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    setMenuState(!navLinks.classList.contains('active'));
  });

  navItems.forEach(function (item) {
    item.addEventListener('click', function () {
      setMenuState(false);
    });
  });
}

function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(function (link) {
    link.classList.remove('active');

    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}

function initializeTheme() {
  const theme = getStoredTheme() || getSystemTheme();
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

  const menuToggle = navRight.querySelector('.menu-toggle');
  if (menuToggle) {
    navRight.insertBefore(button, menuToggle);
  } else {
    navRight.appendChild(button);
  }

  const syncToggleLabel = function () {
    const currentTheme = getCurrentTheme();
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    button.textContent = currentTheme === 'dark' ? '\u2600' : '\u263E';
    button.setAttribute('aria-pressed', String(currentTheme === 'dark'));
    button.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
    button.setAttribute('title', `Switch to ${nextTheme} mode`);
  };

  button.addEventListener('click', function () {
    const currentTheme = getCurrentTheme();
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    storeTheme(nextTheme);
    syncToggleLabel();
  });

  syncToggleLabel();
}

function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') || 'light';
}

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredTheme() {
  try {
    return localStorage.getItem('theme');
  } catch (error) {
    return null;
  }
}

function storeTheme(theme) {
  try {
    localStorage.setItem('theme', theme);
  } catch (error) {
    // Ignore storage write failures so theme switching still works for the session.
  }
}

function setupNavbarSparkles() {
  const navbarButtons = document.querySelectorAll('.nav-links a, .theme-toggle');
  if (!navbarButtons.length) {
    return;
  }

  navbarButtons.forEach(function (button) {
    button.addEventListener('pointerdown', function (event) {
      if (getCurrentTheme() !== 'dark') {
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
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeIn 0.6s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealItems.forEach(function (element) {
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

  const openModal = function () {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = function () {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  avatar.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    openModal();
  });

  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}
