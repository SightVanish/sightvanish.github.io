'use strict';

// Element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
const sidebarClose = document.querySelector("[data-sidebar-close]");

// Sidebar toggle functionality for mobile
if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function (e) { 
    e.preventDefault();
    e.stopPropagation();
    sidebar.classList.add("active");
    document.body.style.overflow = 'hidden';
  });
}

// Sidebar close functionality for mobile
if (sidebarClose) {
  sidebarClose.addEventListener("click", function (e) { 
    e.preventDefault();
    e.stopPropagation();
    sidebar.classList.remove("active");
    document.body.style.overflow = '';
  });
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function(event) {
  if (window.innerWidth < 1024) {
    if (sidebar && !sidebar.contains(event.target) && sidebarBtn && !sidebarBtn.contains(event.target)) {
      sidebar.classList.remove("active");
      document.body.style.overflow = '';
    }
  }
});

// Close sidebar on escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && window.innerWidth < 1024) {
    if (sidebar) {
      sidebar.classList.remove("active");
      document.body.style.overflow = '';
    }
  }
});

// Custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// Add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    if (select) elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// Filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// Add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    // Remove active class from all buttons
    filterBtn.forEach(btn => {
      btn.classList.remove("active");
      btn.classList.remove("text-blue-600");
      btn.classList.add("text-gray-700");
    });
    
    // Add active class to clicked button
    this.classList.add("active");
    this.classList.remove("text-gray-700");
    this.classList.add("text-blue-600");
    
    lastClickedBtn = this;
  });
}

// Contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // Check form validation
    if (form && form.checkValidity()) {
      if (formBtn) formBtn.removeAttribute("disabled");
    } else {
      if (formBtn) formBtn.setAttribute("disabled", "");
    }
  });
}

// Smooth scrolling navigation - handle both desktop and mobile navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]");

// Add event to all nav links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      // Calculate offset based on device type
      let offset = 0;
      if (window.innerWidth < 1024) {
        // Mobile: account for mobile header + bottom nav
        offset = 60 + 80;
      } else {
        // Desktop: account for navbar
        offset = 80;
      }
      
      const targetPosition = targetSection.offsetTop - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Update navigation link styles
      navigationLinks.forEach(link => {
        link.classList.remove("active");
        link.classList.remove("text-blue-600");
        link.classList.add("text-gray-700");
      });
      
      this.classList.add("active");
      this.classList.remove("text-gray-700");
      this.classList.add("text-blue-600");
      
      // Close mobile sidebar if open
      if (window.innerWidth < 1024 && sidebar) {
        sidebar.classList.remove("active");
        document.body.style.overflow = '';
      }
    }
  });
}

// Update active navigation link based on scroll position
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY;
  
  // Calculate offset based on device type
  let offset = 0;
  if (window.innerWidth < 1024) {
    // Mobile: account for mobile header + bottom nav
    offset = 140;
  } else {
    // Desktop: account for navbar
    offset = 100;
  }
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPos + offset >= sectionTop && scrollPos + offset < sectionTop + sectionHeight) {
      // Remove active class from all navigation links
      navigationLinks.forEach(link => {
        link.classList.remove("active");
        link.classList.remove("text-blue-600");
        link.classList.add("text-gray-700");
      });
      
      // Add active class to corresponding navigation link
      const activeLink = document.querySelector(`[href="#${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add("active");
        activeLink.classList.remove("text-gray-700");
        activeLink.classList.add("text-blue-600");
      }
    }
  });
});

// Initialize the first navigation link as active
document.addEventListener('DOMContentLoaded', function() {
  // Ensure page starts at the top
  window.scrollTo(0, 0);
  
  // Set initial navigation link state
  const firstNavLink = document.querySelector('[data-nav-link]');
  
  if (firstNavLink) {
    firstNavLink.classList.add('active');
    firstNavLink.classList.remove('text-gray-700');
    firstNavLink.classList.add('text-blue-600');
  }
  
  // Set initial filter button state
  if (filterBtn[0]) {
    filterBtn[0].classList.add('active');
    filterBtn[0].classList.remove('text-gray-700');
    filterBtn[0].classList.add('text-blue-600');
  }
  
  // Add smooth animations for section transitions
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all sections for animation
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
  
  // Add touch feedback for mobile
  if ('ontouchstart' in window) {
    const touchElements = document.querySelectorAll('.service-item, .project-item, .skill-box, .nav-item, .contact-item');
    
    touchElements.forEach(element => {
      element.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.98)';
      });
      
      element.addEventListener('touchend', function() {
        this.style.transform = '';
      });
    });
  }
});

// Ensure page is at top after all resources are loaded
window.addEventListener('load', function() {
  if (window.scrollY > 0) {
    window.scrollTo(0, 0);
  }
});

// Handle scroll restoration on page refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
  if (window.innerWidth >= 1024 && sidebar) {
    sidebar.classList.remove("active");
    document.body.style.overflow = '';
  }
});

// Add smooth scrolling for iOS Safari
if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
  document.addEventListener('touchmove', function(e) {
    if (e.target.closest('.sidebar')) {
      e.preventDefault();
    }
  }, { passive: false });
}

// Google Analytics Tracking Script
(function() {
  const GA_MEASUREMENT_ID = "G-3E08RYVGKY";

  // Load Google Analytics script dynamically
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize Google Analytics
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID);
})();