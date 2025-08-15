'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
const sidebarClose = document.querySelector("[data-sidebar-close]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function (e) { 
  e.preventDefault();
  e.stopPropagation();
  sidebar.classList.add("active");
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
});

// sidebar close functionality for mobile
if (sidebarClose) {
  sidebarClose.addEventListener("click", function (e) { 
    e.preventDefault();
    e.stopPropagation();
    sidebar.classList.remove("active");
    document.body.style.overflow = ''; // Restore scrolling
  });
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function(event) {
  if (window.innerWidth < 1024) { // Only on mobile
    if (!sidebar.contains(event.target) && !sidebarBtn.contains(event.target)) {
      sidebar.classList.remove("active");
      document.body.style.overflow = ''; // Restore scrolling
    }
  }
});

// Close sidebar on escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && window.innerWidth < 1024) {
    sidebar.classList.remove("active");
    document.body.style.overflow = '';
  }
});

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
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

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
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

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// Smooth scrolling navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]");

// add event to all nav links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      // Use the CSS scroll-margin-top for consistent spacing
      // The CSS already handles the navbar offset via scroll-margin-top
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
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
      if (window.innerWidth < 1024) {
        sidebar.classList.remove("active");
        document.body.style.overflow = '';
      }
    }
  });
}

// Update active navigation link based on scroll position
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id]');
  // Only apply offset if we've actually scrolled, not on initial load
  const scrollPos = window.scrollY > 0 ? window.scrollY + 100 : window.scrollY;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
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
});

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
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
});

// Ensure page is at top after all resources are loaded
window.addEventListener('load', function() {
  // Force scroll to top to prevent any scroll restoration issues
  if (window.scrollY > 0) {
    window.scrollTo(0, 0);
  }
});

// Handle scroll restoration on page refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Google Analytics Tracking Script
(function() {
  let GA_MEASUREMENT_ID = "G-3E08RYVGKY";

  // Load Google Analytics script dynamically
  let script = document.createElement("script");
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