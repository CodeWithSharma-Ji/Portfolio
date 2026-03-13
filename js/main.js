document.addEventListener('DOMContentLoaded', function () {
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
