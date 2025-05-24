
// Global Variables
let currentSection = 'home';
let isScrolling = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    initializeNavigation();
    initializeTypewriter();
    initializeScrollEffects();
    initializeSkillBars();
    initializeContactForm();
    initializeLazyLoading();
    initializeMobileMenu();
}

// Navigation Functions
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
    
    // Handle scroll effect on navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active navigation link
        updateActiveNavLink();
    });
    
    // Add click listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenu.classList.remove('active');
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

// Mobile Menu
function initializeMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    navToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Smooth Scrolling
function scrollToSection(targetId) {
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        currentSection = targetId;
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Typewriter Effect
function initializeTypewriter() {
    const typedTextElement = document.getElementById('typed-text');
    const textToType = "Designer & CSE Student";
    let charIndex = 0;
    
    function typeCharacter() {
        if (charIndex < textToType.length) {
            typedTextElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeCharacter, 100);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeCharacter, 1000);
}

// Scroll Effects and Animations
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Trigger skill bar animations when skills section is visible
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const elementsToObserve = document.querySelectorAll('section, .card, .project-card, .timeline-item');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
}

// Skill Bar Animations
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        const targetWidth = bar.getAttribute('data-width') + '%';
        
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, index * 200);
    });
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission();
    });
}

function handleFormSubmission() {
    const submitBtn = document.querySelector('#contact-form button[type="submit"]');
    const submitText = document.getElementById('submit-text');
    const loadingText = document.getElementById('loading-text');
    
    // Show loading state
    submitText.style.display = 'none';
    loadingText.style.display = 'block';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Show success message
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form
        document.getElementById('contact-form').reset();
        
        // Reset button state
        submitText.style.display = 'block';
        loadingText.style.display = 'none';
        submitBtn.disabled = false;
    }, 2000);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add notification styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                padding: 1rem 1.5rem;
                border-radius: 0.5rem;
                color: white;
                font-weight: 500;
                animation: slideInRight 0.3s ease;
                max-width: 400px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            }
            .notification-success {
                background: linear-gradient(135deg, #10b981, #059669);
            }
            .notification-error {
                background: linear-gradient(135deg, #ef4444, #dc2626);
            }
            .notification-info {
                background: linear-gradient(135deg, #3b82f6, #2563eb);
            }
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.25rem;
                cursor: pointer;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Lazy Loading for Images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance Optimization
function initializePerformanceOptimizations() {
    // Throttled scroll handler
    const throttledScrollHandler = throttle(() => {
        updateActiveNavLink();
    }, 100);
    
    window.addEventListener('scroll', throttledScrollHandler);
    
    // Preload critical resources
    const criticalImages = [
        // Add paths to critical images here
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send error reports to a logging service here
});

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', initializePerformanceOptimizations);

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.remove('active');
    }
    
    // Arrow keys for section navigation
    if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        navigateToNextSection();
    } else if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        navigateToPrevSection();
    }
});

function navigateToNextSection() {
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    const currentIndex = sections.indexOf(currentSection);
    const nextIndex = (currentIndex + 1) % sections.length;
    scrollToSection(sections[nextIndex]);
}

function navigateToPrevSection() {
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    const currentIndex = sections.indexOf(currentSection);
    const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
    scrollToSection(sections[prevIndex]);
}

// Browser Compatibility Checks
function checkBrowserCompatibility() {
    // Check for CSS Grid support
    if (!CSS.supports('display', 'grid')) {
        console.warn('CSS Grid not supported. Consider providing fallbacks.');
    }
    
    // Check for Intersection Observer support
    if (!('IntersectionObserver' in window)) {
        console.warn('IntersectionObserver not supported. Loading polyfill...');
        // You could load a polyfill here
    }
}

// Initialize compatibility checks
document.addEventListener('DOMContentLoaded', checkBrowserCompatibility);

// Analytics (placeholder)
function trackEvent(eventName, properties = {}) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, properties);
    // You would integrate with your analytics service here
}

// Track page interactions
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn, .nav-link, .social-link')) {
        const elementText = e.target.textContent || e.target.getAttribute('aria-label') || 'unknown';
        trackEvent('button_click', {
            element: elementText,
            section: currentSection
        });
    }
});