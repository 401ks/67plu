// Main JavaScript for Six7 Plumbing
// WhatsApp pre-fill logic, navigation toggle, banner dismiss

document.addEventListener('DOMContentLoaded', function() {
  
  // Mobile Navigation Toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
      }
    });
  }
  
  // Payment Reminder Banner Dismiss
  const paymentReminder = document.getElementById('paymentReminder');
  if (paymentReminder) {
    // Check if dismissed in localStorage
    if(localStorage.getItem('paymentReminderDismissed') === 'true') {
      paymentReminder.style.display = 'none';
    }
    
    // Add dismiss functionality
    const dismissBtn = paymentReminder.querySelector('.dismiss');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', function() {
        paymentReminder.style.display = 'none';
        localStorage.setItem('paymentReminderDismissed', 'true');
      });
    }
  }
  
  // WhatsApp Pre-fill Logic
  function getPrefillText(service, location = 'Colombo', issue = '') {
    const base = `SERVICE ${service.toUpperCase()} LOCATION ${location.toUpperCase()}`;
    return issue ? `${base} ISSUE ${issue}` : base;
  }
  
  // Attach to all WhatsApp links with data attributes
  document.querySelectorAll('[data-whatsapp]').forEach(link => {
    const service = link.dataset.service || 'GENERAL';
    const location = link.dataset.location || 'Colombo';
    const issue = link.dataset.issue || '';
    const prefillText = getPrefillText(service, location, issue);
    link.href = `https://wa.me/94758244216?text=${encodeURIComponent(prefillText)}`;
  });
  
  // Auto-detect location from URL path for location pages
  const path = window.location.pathname;
  const locationMatch = path.match(/\/location\/([^/]+)/);
  if(locationMatch) {
    const suburb = locationMatch[1].charAt(0).toUpperCase() + locationMatch[1].slice(1);
    document.querySelectorAll('[data-location-auto]').forEach(el => {
      el.dataset.location = suburb;
      el.href = `https://wa.me/94758244216?text=${encodeURIComponent(`HELP NEEDED IN ${suburb.toUpperCase()}`)}`;
    });
  }
  
  // Form validation enhancement
  const forms = document.querySelectorAll('.plumbing-form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const phoneInput = form.querySelector('#phone');
      if (phoneInput) {
        const phoneValue = phoneInput.value.replace(/\s/g, '');
        if (!/^\+94[0-9]{9}$/.test(phoneValue)) {
          e.preventDefault();
          alert('Please enter a valid Sri Lankan phone number (e.g., +94758244216)');
          phoneInput.focus();
        }
      }
    });
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
  
});
