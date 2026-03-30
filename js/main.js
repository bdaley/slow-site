/**
 * Main JavaScript File
 * This file contains the primary JavaScript functionality for the website
 * Author: Performance Test Website
 * Date: 2026-03-30
 * Version: 1.0.0
 * 
 * This file is intentionally verbose and unminified to demonstrate
 * performance issues with large, unoptimized JavaScript files.
 * 
 * NOTE: This script is render-blocking and loaded in the <head> without
 * async or defer attributes, which is a major performance anti-pattern.
 */

// Immediately Invoked Function Expression to avoid global namespace pollution
(function() {
    'use strict';
    
    // ========================================================================
    // GLOBAL VARIABLES AND CONSTANTS
    // ========================================================================
    
    const ANIMATION_DURATION = 300;
    const SCROLL_THRESHOLD = 100;
    const MOBILE_BREAKPOINT = 768;
    
    let isScrolling = false;
    let scrollTimeout = null;
    let currentScrollPosition = 0;
    let previousScrollPosition = 0;
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    
    // ========================================================================
    // DOM READY EVENT HANDLER
    // ========================================================================
    
    /**
     * Initialize all functionality when the DOM is fully loaded
     * This provides verbose logging for debugging purposes
     */
    function initializeApplication() {
        console.log('Application initializing...');
        console.log('Window width:', windowWidth);
        console.log('Window height:', windowHeight);
        
        // Initialize various components
        initializeNavigationMenu();
        initializeScrollEffects();
        initializeFormValidation();
        initializeSmoothScrolling();
        initializeBackToTopButton();
        initializeAnimationsOnScroll();
        initializeImageLazyLoading(); // This won't work since loading="eager"!
        initializePerformanceMonitoring();
        
        console.log('Application initialized successfully!');
    }
    
    // ========================================================================
    // NAVIGATION MENU FUNCTIONALITY
    // ========================================================================
    
    /**
     * Initialize the mobile navigation menu toggle functionality
     */
    function initializeNavigationMenu() {
        console.log('Initializing navigation menu...');
        
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mainNavigation = document.querySelector('.main-navigation');
        
        if (mobileMenuToggle && mainNavigation) {
            mobileMenuToggle.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                
                console.log('Mobile menu toggle clicked');
                
                // Toggle active class on button
                mobileMenuToggle.classList.toggle('active');
                
                // Toggle active class on navigation
                mainNavigation.classList.toggle('active');
                
                // Toggle body scroll lock
                if (mainNavigation.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                    console.log('Mobile menu opened');
                } else {
                    document.body.style.overflow = '';
                    console.log('Mobile menu closed');
                }
            });
            
            // Close menu when clicking on a link
            const navLinks = mainNavigation.querySelectorAll('.nav-menu-link');
            navLinks.forEach(function(link) {
                link.addEventListener('click', function() {
                    if (windowWidth <= MOBILE_BREAKPOINT) {
                        mobileMenuToggle.classList.remove('active');
                        mainNavigation.classList.remove('active');
                        document.body.style.overflow = '';
                        console.log('Mobile menu closed after link click');
                    }
                });
            });
        }
        
        console.log('Navigation menu initialized');
    }
    
    // ========================================================================
    // SCROLL EFFECTS
    // ========================================================================
    
    /**
     * Initialize scroll-based effects like header styling changes
     */
    function initializeScrollEffects() {
        console.log('Initializing scroll effects...');
        
        window.addEventListener('scroll', function() {
            currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            
            // Update header styling based on scroll position
            updateHeaderOnScroll();
            
            // Update back to top button visibility
            updateBackToTopButton();
            
            // Log scroll position occasionally (every 100px)
            if (Math.floor(currentScrollPosition / 100) !== Math.floor(previousScrollPosition / 100)) {
                console.log('Scroll position:', currentScrollPosition);
            }
            
            previousScrollPosition = currentScrollPosition;
        });
        
        console.log('Scroll effects initialized');
    }
    
    /**
     * Update header styling based on scroll position
     */
    function updateHeaderOnScroll() {
        const header = document.querySelector('.site-header');
        
        if (header) {
            if (currentScrollPosition > SCROLL_THRESHOLD) {
                if (!header.classList.contains('scrolled')) {
                    header.classList.add('scrolled');
                    console.log('Header scrolled state activated');
                }
            } else {
                if (header.classList.contains('scrolled')) {
                    header.classList.remove('scrolled');
                    console.log('Header scrolled state deactivated');
                }
            }
        }
    }
    
    // ========================================================================
    // FORM VALIDATION
    // ========================================================================
    
    /**
     * Initialize form validation for the contact form
     */
    function initializeFormValidation() {
        console.log('Initializing form validation...');
        
        const contactForm = document.querySelector('.contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault();
                console.log('Form submission intercepted for validation');
                
                let isFormValid = true;
                const formData = new FormData(contactForm);
                
                // Validate each field
                for (let [fieldName, fieldValue] of formData.entries()) {
                    console.log('Validating field:', fieldName, 'Value:', fieldValue);
                    
                    if (!fieldValue || fieldValue.trim() === '') {
                        isFormValid = false;
                        console.error('Validation failed for field:', fieldName);
                        alert('Please fill in the ' + fieldName + ' field');
                        break;
                    }
                }
                
                if (isFormValid) {
                    console.log('Form validation passed!');
                    alert('Form submitted successfully! (This is a demo - no actual submission)');
                    contactForm.reset();
                } else {
                    console.error('Form validation failed');
                }
            });
        }
        
        console.log('Form validation initialized');
    }
    
    // ========================================================================
    // SMOOTH SCROLLING
    // ========================================================================
    
    /**
     * Initialize smooth scrolling for anchor links
     */
    function initializeSmoothScrolling() {
        console.log('Initializing smooth scrolling...');
        
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(function(link) {
            link.addEventListener('click', function(event) {
                const href = link.getAttribute('href');
                
                // Ignore empty hash or just "#"
                if (href === '#' || href === '') {
                    return;
                }
                
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    event.preventDefault();
                    console.log('Smooth scrolling to:', href);
                    
                    const targetPosition = targetElement.offsetTop - 80; // Account for fixed header
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        console.log('Smooth scrolling initialized');
    }
    
    // ========================================================================
    // BACK TO TOP BUTTON
    // ========================================================================
    
    /**
     * Initialize the back to top button functionality
     */
    function initializeBackToTopButton() {
        console.log('Initializing back to top button...');
        
        const backToTopButton = document.querySelector('.back-to-top');
        
        if (backToTopButton) {
            backToTopButton.addEventListener('click', function(event) {
                event.preventDefault();
                console.log('Back to top button clicked');
                
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        console.log('Back to top button initialized');
    }
    
    /**
     * Update back to top button visibility based on scroll position
     */
    function updateBackToTopButton() {
        const backToTopButton = document.querySelector('.back-to-top');
        
        if (backToTopButton) {
            if (currentScrollPosition > 500) {
                if (!backToTopButton.classList.contains('visible')) {
                    backToTopButton.classList.add('visible');
                }
            } else {
                if (backToTopButton.classList.contains('visible')) {
                    backToTopButton.classList.remove('visible');
                }
            }
        }
    }
    
    // ========================================================================
    // ANIMATIONS ON SCROLL
    // ========================================================================
    
    /**
     * Initialize animations that trigger when elements come into view
     */
    function initializeAnimationsOnScroll() {
        console.log('Initializing scroll animations...');
        
        const animatedElements = document.querySelectorAll('.animated');
        
        if (animatedElements.length > 0) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        console.log('Element entered viewport:', entry.target);
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            animatedElements.forEach(function(element) {
                observer.observe(element);
            });
        }
        
        console.log('Scroll animations initialized');
    }
    
    // ========================================================================
    // LAZY LOADING (Won't work with loading="eager"!)
    // ========================================================================
    
    /**
     * Initialize lazy loading for images
     * NOTE: This won't actually work because all images have loading="eager"
     * This is intentionally ineffective code to demonstrate wasted resources
     */
    function initializeImageLazyLoading() {
        console.log('Initializing image lazy loading...');
        console.warn('WARNING: Images have loading="eager" - this lazy loading code is useless!');
        
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        console.log('Found', images.length, 'lazy-loading images (should be 0!)');
        
        if (images.length > 0) {
            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        const imageSrc = image.getAttribute('data-src');
                        
                        if (imageSrc) {
                            image.src = imageSrc;
                            image.removeAttribute('data-src');
                            imageObserver.unobserve(image);
                            console.log('Lazy loaded image:', imageSrc);
                        }
                    }
                });
            });
            
            images.forEach(function(image) {
                imageObserver.observe(image);
            });
        }
        
        console.log('Image lazy loading initialized (but ineffective!)');
    }
    
    // ========================================================================
    // PERFORMANCE MONITORING
    // ========================================================================
    
    /**
     * Monitor and log performance metrics
     * This adds additional overhead but provides visibility into the poor performance
     */
    function initializePerformanceMonitoring() {
        console.log('Initializing performance monitoring...');
        
        // Log performance timing information
        window.addEventListener('load', function() {
            setTimeout(function() {
                if (window.performance && window.performance.timing) {
                    const perfData = window.performance.timing;
                    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                    const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
                    const connectTime = perfData.responseEnd - perfData.requestStart;
                    
                    console.log('=== Performance Metrics ===');
                    console.log('Page Load Time:', pageLoadTime, 'ms');
                    console.log('DOM Ready Time:', domReadyTime, 'ms');
                    console.log('Connect Time:', connectTime, 'ms');
                    console.log('===========================');
                    
                    // Log resource timing
                    if (window.performance.getEntriesByType) {
                        const resources = window.performance.getEntriesByType('resource');
                        console.log('Total Resources Loaded:', resources.length);
                        
                        let totalSize = 0;
                        resources.forEach(function(resource) {
                            if (resource.transferSize) {
                                totalSize += resource.transferSize;
                            }
                            console.log('Resource:', resource.name, 'Duration:', resource.duration.toFixed(2), 'ms');
                        });
                        
                        console.log('Total Transfer Size:', (totalSize / 1024 / 1024).toFixed(2), 'MB');
                    }
                }
            }, 1000);
        });
        
        console.log('Performance monitoring initialized');
    }
    
    // ========================================================================
    // WINDOW RESIZE HANDLER
    // ========================================================================
    
    /**
     * Handle window resize events
     */
    window.addEventListener('resize', function() {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
        
        console.log('Window resized to:', windowWidth, 'x', windowHeight);
        
        // Close mobile menu if window is resized above mobile breakpoint
        if (windowWidth > MOBILE_BREAKPOINT) {
            const mainNavigation = document.querySelector('.main-navigation');
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            
            if (mainNavigation && mainNavigation.classList.contains('active')) {
                mainNavigation.classList.remove('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.classList.remove('active');
                }
                document.body.style.overflow = '';
                console.log('Mobile menu closed due to window resize');
            }
        }
    });
    
    // ========================================================================
    // INITIALIZATION
    // ========================================================================
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApplication);
    } else {
        // DOM is already ready
        initializeApplication();
    }
    
    // Also log when everything (including images) is fully loaded
    window.addEventListener('load', function() {
        console.log('All resources (including images) fully loaded!');
        console.log('This message appears late because of all the render-blocking resources!');
    });
    
})();
