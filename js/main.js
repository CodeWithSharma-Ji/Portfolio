document.addEventListener('DOMContentLoaded', function () {
  initializeTheme();
  setupNavigation();
  setActiveNavLink();
  setupAvatarPopup();
  setupCertificatePreview();
  setupViewOnlyMedia();
  setupThemeToggle();
  setupNavbarSparkles();
  setupRevealAnimations();
});

function setupNavigation() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');
  const navRight = navLinks ? navLinks.closest('.nav-right') : null;
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
    navLinks.classList.toggle('active', isOpen);
    menuToggle.classList.toggle('is-open', isOpen);
    if (navContainer) {
      navContainer.classList.toggle('menu-open', isOpen);
    }
    if (navRight) {
      navRight.classList.toggle('menu-open', isOpen);
    }
    document.body.classList.toggle('mobile-menu-open', isOpen && mobileMediaQuery.matches);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    navLinks.setAttribute('aria-hidden', String(!isOpen));
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

  document.addEventListener('click', function (event) {
    if (!navLinks.classList.contains('active')) {
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

  // Do not hijack clicks when the avatar is part of the logo link.
  // Navigation should remain the primary action in the header.
  if (avatar.closest('a[href]')) {
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

function setupCertificatePreview() {
  const trigger = document.querySelector('.certificate-trigger');
  if (!trigger) {
    return;
  }

  const imageSrc = trigger.getAttribute('data-certificate-src');
  const imageAlt = trigger.getAttribute('data-certificate-alt') || 'Certificate preview';
  if (!imageSrc) {
    return;
  }

  const modal = document.createElement('div');
  modal.className = 'certificate-modal';
  modal.innerHTML = `
    <div class="certificate-modal-dialog" role="dialog" aria-modal="true" aria-label="Certificate preview">
      <button type="button" class="certificate-modal-close" aria-label="Close certificate preview">Close</button>
      <span class="view-only-badge certificate-modal-badge">View Only</span>
      <img src="${imageSrc}" alt="${imageAlt}" class="certificate-modal-image view-only-media" loading="lazy" decoding="async" draggable="false">
    </div>
  `;
  document.body.appendChild(modal);

  const closeButton = modal.querySelector('.certificate-modal-close');

  const openModal = function () {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = function () {
    modal.classList.remove('open');
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
    if (event.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

function setupViewOnlyMedia() {
  const mediaItems = document.querySelectorAll('.view-only-media');
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
