// Dark Mode Toggle Functionality
(function() {
  'use strict';

  // Get DOM elements
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;
  const bodyElement = document.body;
  
  // Theme constants
  const THEME_KEY = 'code-tester-theme';
  const DARK_MODE_CLASS = 'dark-mode';
  
  /**
   * Initialize theme on page load
   * Checks localStorage for saved theme preference
   */
  function initializeTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    
    // If user has dark mode saved, apply it
    if (savedTheme === 'dark') {
      bodyElement.classList.add(DARK_MODE_CLASS);
      updateThemeIcon(true);
    } else {
      // Remove dark mode if not saved
      bodyElement.classList.remove(DARK_MODE_CLASS);
      updateThemeIcon(false);
    }
  }
  
  /**
   * Update theme icon based on current theme
   * @param {boolean} isDarkMode - Current dark mode status
   */
  function updateThemeIcon(isDarkMode) {
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    if (!icon) return;
    
    if (isDarkMode) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  }
  
  /**
   * Toggle dark mode on/off
   */
  function toggleDarkMode() {
    const isDarkMode = bodyElement.classList.toggle(DARK_MODE_CLASS);
    
    // Save preference to localStorage
    localStorage.setItem(
      THEME_KEY, 
      isDarkMode ? 'dark' : 'light'
    );
    
    // Update icon
    updateThemeIcon(isDarkMode);
  }
  
  /**
   * Smooth scroll to section
   * @param {string} sectionId - ID of section to scroll to
   */
  function smoothScrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
  /**
   * Add event listeners
   */
  function attachEventListeners() {
    // Theme toggle button
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleDarkMode);
    }
    
    // Navbar collapse on link click (Bootstrap)
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
      const navLinks = navbarCollapse.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          // Close navbar after clicking a link
          if (navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
          }
        });
      });
    }
  }
  
  /**
   * Add animation to elements on scroll
   */
  function setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe all cards and sections
    const elements = document.querySelectorAll('.code-card, .section-container, .about-card');
    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }
  
  /**
   * Initialize all functionality
   */
  function init() {
    initializeTheme();
    attachEventListeners();
    setupIntersectionObserver();
  }
  
  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();
