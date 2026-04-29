document.addEventListener('DOMContentLoaded', function () {
  initializeTheme();
  setupNavigation();
  setActiveNavLink();
  setupAvatarPopup();
  setupCertificatePreview();
  setupViewOnlyMedia();
  setupThemeToggle();
  setupNavbarSparkles();
});

function setupNavigation() {
  const menuToggle = document.querySelector('.pf-mobile-menu-toggle-btn');
  const navLinks = document.querySelector('.pf-navbar-navigation-list');
  const navItems = document.querySelectorAll('.pf-navbar-navigation-list a');
  const navRight = navLinks ? navLinks.closest('.pf-navbar-right-section') : null;
  const navContainer = menuToggle ? menuToggle.closest('nav') : null;
  const mobileMediaQuery = window.matchMedia('(max-width: 768px)');

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
  navLinks.setAttribute('aria-hidden', 'true');

  const setMenuState = function (isOpen) {
    navLinks.classList.toggle('pf-state-active', isOpen);
    menuToggle.classList.toggle('pf-state-is-open', isOpen);
    if (navContainer) {
      navContainer.classList.toggle('pf-state-menu-open', isOpen);
    }
    if (navRight) {
      navRight.classList.toggle('pf-state-menu-open', isOpen);
    }
    document.body.classList.toggle('pf-state-mobile-menu-open', isOpen && mobileMediaQuery.matches);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    navLinks.setAttribute('aria-hidden', String(!isOpen));
  };

  menuToggle.addEventListener('click', function () {
    setMenuState(!navLinks.classList.contains('pf-state-active'));
  });

  menuToggle.addEventListener('keydown', function (event) {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    setMenuState(!navLinks.classList.contains('pf-state-active'));
  });

  navItems.forEach(function (item) {
    item.addEventListener('click', function () {
      setMenuState(false);
    });
  });

  document.addEventListener('click', function (event) {
    if (!navLinks.classList.contains('pf-state-active')) {
      return;
    }

    if (menuToggle.contains(event.target) || navLinks.contains(event.target)) {
      return;
    }

    setMenuState(false);
  });

  mobileMediaQuery.addEventListener('change', function (event) {
    if (!event.matches) {
      setMenuState(false);
    }
  });
}

function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.pf-navbar-navigation-list a');

  navLinks.forEach(function (link) {
    link.classList.remove('pf-state-active');

    if (link.getAttribute('href') === currentPage) {
      link.classList.add('pf-state-active');
    }
  });
}

function initializeTheme() {
  const theme = getStoredTheme() || getSystemTheme();
  document.documentElement.setAttribute('data-theme', theme);
}

function setupThemeToggle() {
  const buttons = document.querySelectorAll('.pf-theme-switcher-button');
  
  if (!buttons.length) {
    return;
  }

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      const currentTheme = getCurrentTheme();
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      storeTheme(nextTheme);
      
      // Update ARIA attributes for accessibility
      button.setAttribute('aria-pressed', String(nextTheme === 'dark'));
      button.setAttribute('aria-label', `Switch to ${currentTheme} mode`);
      button.setAttribute('title', `Switch to ${currentTheme} mode`);
    });
    
    // Set initial ARIA state
    const initialTheme = getCurrentTheme();
    button.setAttribute('aria-pressed', String(initialTheme === 'dark'));
  });
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
  const navbarButtons = document.querySelectorAll('.pf-navbar-navigation-list a, .pf-theme-switcher-button');
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
    sparkle.className = 'pf-navbar-interaction-sparkle';
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

function setupAvatarPopup() {
  const avatar = document.querySelector('.pf-logo-avatar-image');
  if (!avatar) {
    return;
  }

  // Do not hijack clicks when the avatar is part of the logo link.
  // Navigation should remain the primary action in the header.
  if (avatar.closest('a[href]')) {
    return;
  }

  const modal = document.createElement('div');
  modal.className = 'pf-profile-avatar-modal';
  modal.innerHTML = `<img src="${avatar.getAttribute('src')}" alt="${avatar.getAttribute('alt') || 'Profile'}" class="pf-avatar-modal-image">`;
  document.body.appendChild(modal);

  const openModal = function () {
    modal.classList.add('pf-state-open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = function () {
    modal.classList.remove('pf-state-open');
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
    if (event.key === 'Escape' && modal.classList.contains('pf-state-open')) {
      closeModal();
    }
  });
}

function setupCertificatePreview() {
  const trigger = document.querySelector('.pf-certificate-preview-trigger');
  if (!trigger) {
    return;
  }

  const imageSrc = trigger.getAttribute('data-certificate-src');
  const imageAlt = trigger.getAttribute('data-certificate-alt') || 'Certificate preview';
  if (!imageSrc) {
    return;
  }

  const modal = document.createElement('div');
  modal.className = 'pf-certificate-preview-modal';
  modal.innerHTML = `
    <div class="pf-certificate-modal-dialog-box" role="dialog" aria-modal="true" aria-label="Certificate preview">
      <button type="button" class="pf-certificate-modal-close-btn" aria-label="Close certificate preview">Close</button>
      <span class="view-only-badge certificate-modal-badge">View Only</span>
      <img src="${imageSrc}" alt="${imageAlt}" class="certificate-modal-image view-only-media" loading="lazy" decoding="async" draggable="false">
    </div>
  `;
  document.body.appendChild(modal);

  const closeButton = modal.querySelector('.pf-certificate-modal-close-btn');

  const openModal = function () {
    modal.classList.add('pf-state-open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = function () {
    modal.classList.remove('pf-state-open');
    document.body.style.overflow = '';
  };

  trigger.addEventListener('click', function () {
    openModal();
  });

  if (closeButton) {
    closeButton.addEventListener('click', function () {
      closeModal();
    });
  }

  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modal.classList.contains('pf-state-open')) {
      closeModal();
    }
  });
}

function setupViewOnlyMedia() {
  const mediaItems = document.querySelectorAll('.pf-view-only-media-element');
  if (!mediaItems.length) {
    return;
  }

  mediaItems.forEach(function (media) {
    media.setAttribute('draggable', 'false');

    media.addEventListener('contextmenu', function (event) {
      event.preventDefault();
    });

    media.addEventListener('dragstart', function (event) {
      event.preventDefault();
    });
  });
}
