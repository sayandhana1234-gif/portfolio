/**
 * Sayandhana KS Portfolio - Clean & Professional Interactive Script
 * Features: Dark/Light Mode, Mobile Navigation, Smooth Anchor Scrolling, Form Validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Dynamic Footer Year ---
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --- 2. Dark / Light Mode Toggle ---
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
  const savedTheme = localStorage.getItem('sayandhana-theme');

  // Check saved theme or OS preference
  if (savedTheme === 'light' || (!savedTheme && window.matchMedia('(prefers-color-scheme: light)').matches)) {
    document.body.classList.add('light-theme');
    if (themeIcon) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      localStorage.setItem('sayandhana-theme', isLight ? 'light' : 'dark');

      if (themeIcon) {
        if (isLight) {
          themeIcon.classList.remove('fa-moon');
          themeIcon.classList.add('fa-sun');
        } else {
          themeIcon.classList.remove('fa-sun');
          themeIcon.classList.add('fa-moon');
        }
      }
    });
  }

  // --- 3. Reliable Smooth Scrolling for All Internal Anchor Links (including "Get In Touch") ---
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          // Update URL hash without abrupt jumping
          if (history.pushState) {
            history.pushState(null, null, targetId);
          } else {
            location.hash = targetId;
          }
        }
      }
    });
  });

  // --- 4. Mobile Navigation Hamburger Menu ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-link');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close mobile menu on link click
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      }
    });
  }

  // --- 5. Sticky Navbar & Scrollspy ---
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Navbar shadow on scroll
    if (scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Scrollspy active section indicator
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  });

  // Back to Top Action
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- 6. Contact Form Validation & Submission ---
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const toast = document.getElementById('toast');
  const toastTitle = document.getElementById('toast-title');
  const toastMessage = document.getElementById('toast-message');

  function showToast(title, message, isSuccess = true) {
    if (!toast) return;

    if (toastTitle) toastTitle.textContent = title;
    if (toastMessage) toastMessage.textContent = message;

    const icon = toast.querySelector('.toast-icon');
    if (icon) {
      if (isSuccess) {
        icon.className = 'fa-solid fa-circle-check toast-icon';
        icon.style.color = 'var(--accent-green)';
        toast.style.borderColor = 'var(--accent-green)';
      } else {
        icon.className = 'fa-solid fa-circle-exclamation toast-icon';
        icon.style.color = 'var(--accent-red)';
        toast.style.borderColor = 'var(--accent-red)';
      }
    }

    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    function validateField(input, condition) {
      const parent = input.closest('.form-group');
      if (!parent) return false;

      if (condition) {
        parent.classList.remove('invalid');
        return true;
      } else {
        parent.classList.add('invalid');
        return false;
      }
    }

    // Clear error message on typing
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
      if (!input) return;
      input.addEventListener('input', () => {
        const parent = input.closest('.form-group');
        if (parent) parent.classList.remove('invalid');
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const isNameValid = validateField(nameInput, nameInput.value.trim().length >= 2);
      const isEmailValid = validateField(emailInput, emailRegex.test(emailInput.value.trim()));
      const isSubjectValid = validateField(subjectInput, subjectInput.value.trim().length >= 3);
      const isMessageValid = validateField(messageInput, messageInput.value.trim().length >= 10);

      if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
        showToast('Validation Error', 'Please complete all required fields correctly.', false);
        return;
      }

      // Format message body
      const subject = encodeURIComponent(subjectInput.value.trim() || 'Portfolio Inquiry');
      const bodyText = `Hi Sayandhana,\n\n${messageInput.value.trim()}\n\n---\nSent by: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}`;
      const body = encodeURIComponent(bodyText);

      // 1. Direct Gmail Web Compose link
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=sayandhana1234@gmail.com&su=${subject}&body=${body}`;
      
      // Open in Gmail directly
      const newTab = window.open(gmailUrl, '_blank');

      // 2. Fallback mailto trigger for users without Gmail active
      if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
        window.location.href = `mailto:sayandhana1234@gmail.com?subject=${subject}&body=${body}`;
      }

      // Feedback & reset
      showToast('Opening Email...', 'Pre-filling your message to sayandhana1234@gmail.com! Just hit Send in Gmail.', true);
      contactForm.reset();
    });
  }

  // --- 7. Email Click Helper: Open Gmail Web & Copy Address ---
  const emailLinks = document.querySelectorAll('.email-click-link');
  emailLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText('sayandhana1234@gmail.com').then(() => {
          showToast('Opening Gmail', 'Email copied to clipboard: sayandhana1234@gmail.com', true);
        });
      }
    });
  });
});
