/**
 * Image Carousel JavaScript File
 * This file contains functionality for an image carousel/slider
 * Author: Performance Test Website
 * Date: 2026-03-30
 * Version: 1.0.0
 * 
 * This is another separate JavaScript file to add more HTTP requests
 * and demonstrate render-blocking issues. This carousel isn't even
 * used on the current page, making it completely unnecessary overhead!
 */

window.ImageCarousel = (function() {
    'use strict';
    
    // ========================================================================
    // CAROUSEL CONFIGURATION
    // ========================================================================
    
    const DEFAULT_CONFIG = {
        autoplay: true,
        autoplayDelay: 5000,
        transitionDuration: 500,
        loop: true,
        showIndicators: true,
        showNavigation: true,
        pauseOnHover: true,
        swipeEnabled: true
    };
    
    // ========================================================================
    // CAROUSEL CLASS
    // ========================================================================
    
    /**
     * ImageCarousel class constructor
     * @param {HTMLElement} container - The carousel container element
     * @param {Object} options - Configuration options
     */
    function ImageCarousel(container, options) {
        if (!container) {
            console.error('ImageCarousel: Container element is required');
            return;
        }
        
        this.container = container;
        this.config = Object.assign({}, DEFAULT_CONFIG, options || {});
        this.slides = [];
        this.currentIndex = 0;
        this.isTransitioning = false;
        this.autoplayTimer = null;
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        console.log('ImageCarousel: Initializing carousel', this.config);
        
        this.init();
    }
    
    /**
     * Initialize the carousel
     */
    ImageCarousel.prototype.init = function() {
        console.log('ImageCarousel: Initialization started');
        
        // Find all slides
        this.slides = Array.from(this.container.querySelectorAll('.carousel-slide'));
        
        if (this.slides.length === 0) {
            console.warn('ImageCarousel: No slides found');
            return;
        }
        
        console.log('ImageCarousel: Found', this.slides.length, 'slides');
        
        // Set up initial state
        this.setupSlides();
        
        // Create navigation
        if (this.config.showNavigation) {
            this.createNavigation();
        }
        
        // Create indicators
        if (this.config.showIndicators) {
            this.createIndicators();
        }
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Start autoplay
        if (this.config.autoplay) {
            this.startAutoplay();
        }
        
        console.log('ImageCarousel: Initialization complete');
    };
    
    /**
     * Set up the initial state of slides
     */
    ImageCarousel.prototype.setupSlides = function() {
        console.log('ImageCarousel: Setting up slides');
        
        this.slides.forEach(function(slide, index) {
            slide.style.position = 'absolute';
            slide.style.top = '0';
            slide.style.left = '0';
            slide.style.width = '100%';
            slide.style.opacity = index === 0 ? '1' : '0';
            slide.style.transition = 'opacity ' + this.config.transitionDuration + 'ms ease';
            slide.setAttribute('data-slide-index', index);
        }.bind(this));
        
        this.container.style.position = 'relative';
    };
    
    /**
     * Create navigation buttons
     */
    ImageCarousel.prototype.createNavigation = function() {
        console.log('ImageCarousel: Creating navigation buttons');
        
        const prevButton = document.createElement('button');
        prevButton.className = 'carousel-nav carousel-nav-prev';
        prevButton.innerHTML = '‹';
        prevButton.setAttribute('aria-label', 'Previous slide');
        
        const nextButton = document.createElement('button');
        nextButton.className = 'carousel-nav carousel-nav-next';
        nextButton.innerHTML = '›';
        nextButton.setAttribute('aria-label', 'Next slide');
        
        this.container.appendChild(prevButton);
        this.container.appendChild(nextButton);
        
        prevButton.addEventListener('click', this.previous.bind(this));
        nextButton.addEventListener('click', this.next.bind(this));
    };
    
    /**
     * Create indicator dots
     */
    ImageCarousel.prototype.createIndicators = function() {
        console.log('ImageCarousel: Creating indicators');
        
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'carousel-indicators';
        
        for (let i = 0; i < this.slides.length; i++) {
            const indicator = document.createElement('button');
            indicator.className = 'carousel-indicator';
            indicator.setAttribute('data-slide-index', i);
            indicator.setAttribute('aria-label', 'Go to slide ' + (i + 1));
            
            if (i === 0) {
                indicator.classList.add('active');
            }
            
            indicator.addEventListener('click', function() {
                this.goToSlide(i);
            }.bind(this));
            
            indicatorsContainer.appendChild(indicator);
        }
        
        this.container.appendChild(indicatorsContainer);
    };
    
    /**
     * Set up event listeners
     */
    ImageCarousel.prototype.setupEventListeners = function() {
        console.log('ImageCarousel: Setting up event listeners');
        
        // Pause on hover
        if (this.config.pauseOnHover) {
            this.container.addEventListener('mouseenter', this.pauseAutoplay.bind(this));
            this.container.addEventListener('mouseleave', this.resumeAutoplay.bind(this));
        }
        
        // Touch/swipe support
        if (this.config.swipeEnabled) {
            this.container.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
            this.container.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
        }
    };
    
    /**
     * Go to specific slide
     * @param {number} index - Slide index
     */
    ImageCarousel.prototype.goToSlide = function(index) {
        if (this.isTransitioning) {
            console.log('ImageCarousel: Transition in progress, ignoring request');
            return;
        }
        
        if (index < 0 || index >= this.slides.length) {
            console.warn('ImageCarousel: Invalid slide index', index);
            return;
        }
        
        if (index === this.currentIndex) {
            console.log('ImageCarousel: Already on slide', index);
            return;
        }
        
        console.log('ImageCarousel: Transitioning from slide', this.currentIndex, 'to', index);
        
        this.isTransitioning = true;
        
        const currentSlide = this.slides[this.currentIndex];
        const nextSlide = this.slides[index];
        
        // Fade out current slide
        currentSlide.style.opacity = '0';
        
        // Fade in next slide
        nextSlide.style.opacity = '1';
        
        // Update current index
        this.currentIndex = index;
        
        // Update indicators
        this.updateIndicators();
        
        // Reset transitioning flag after animation
        setTimeout(function() {
            this.isTransitioning = false;
            console.log('ImageCarousel: Transition complete');
        }.bind(this), this.config.transitionDuration);
    };
    
    /**
     * Go to next slide
     */
    ImageCarousel.prototype.next = function() {
        console.log('ImageCarousel: Next slide requested');
        
        let nextIndex = this.currentIndex + 1;
        
        if (nextIndex >= this.slides.length) {
            if (this.config.loop) {
                nextIndex = 0;
            } else {
                console.log('ImageCarousel: At last slide, not looping');
                return;
            }
        }
        
        this.goToSlide(nextIndex);
    };
    
    /**
     * Go to previous slide
     */
    ImageCarousel.prototype.previous = function() {
        console.log('ImageCarousel: Previous slide requested');
        
        let prevIndex = this.currentIndex - 1;
        
        if (prevIndex < 0) {
            if (this.config.loop) {
                prevIndex = this.slides.length - 1;
            } else {
                console.log('ImageCarousel: At first slide, not looping');
                return;
            }
        }
        
        this.goToSlide(prevIndex);
    };
    
    /**
     * Update indicator states
     */
    ImageCarousel.prototype.updateIndicators = function() {
        const indicators = this.container.querySelectorAll('.carousel-indicator');
        
        indicators.forEach(function(indicator, index) {
            if (index === this.currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        }.bind(this));
    };
    
    /**
     * Start autoplay
     */
    ImageCarousel.prototype.startAutoplay = function() {
        if (!this.config.autoplay) {
            return;
        }
        
        console.log('ImageCarousel: Starting autoplay');
        
        this.autoplayTimer = setInterval(function() {
            this.next();
        }.bind(this), this.config.autoplayDelay);
    };
    
    /**
     * Pause autoplay
     */
    ImageCarousel.prototype.pauseAutoplay = function() {
        if (this.autoplayTimer) {
            console.log('ImageCarousel: Pausing autoplay');
            clearInterval(this.autoplayTimer);
            this.autoplayTimer = null;
        }
    };
    
    /**
     * Resume autoplay
     */
    ImageCarousel.prototype.resumeAutoplay = function() {
        if (this.config.autoplay && !this.autoplayTimer) {
            console.log('ImageCarousel: Resuming autoplay');
            this.startAutoplay();
        }
    };
    
    /**
     * Handle touch start
     * @param {TouchEvent} event - Touch event
     */
    ImageCarousel.prototype.handleTouchStart = function(event) {
        this.touchStartX = event.changedTouches[0].screenX;
        console.log('ImageCarousel: Touch start at', this.touchStartX);
    };
    
    /**
     * Handle touch end
     * @param {TouchEvent} event - Touch event
     */
    ImageCarousel.prototype.handleTouchEnd = function(event) {
        this.touchEndX = event.changedTouches[0].screenX;
        console.log('ImageCarousel: Touch end at', this.touchEndX);
        this.handleSwipe();
    };
    
    /**
     * Handle swipe gesture
     */
    ImageCarousel.prototype.handleSwipe = function() {
        const swipeThreshold = 50;
        const swipeDistance = this.touchEndX - this.touchStartX;
        
        if (Math.abs(swipeDistance) < swipeThreshold) {
            console.log('ImageCarousel: Swipe distance too small');
            return;
        }
        
        if (swipeDistance > 0) {
            console.log('ImageCarousel: Swipe right detected');
            this.previous();
        } else {
            console.log('ImageCarousel: Swipe left detected');
            this.next();
        }
    };
    
    /**
     * Destroy the carousel and clean up
     */
    ImageCarousel.prototype.destroy = function() {
        console.log('ImageCarousel: Destroying carousel');
        
        this.pauseAutoplay();
        
        // Remove created elements
        const navButtons = this.container.querySelectorAll('.carousel-nav');
        const indicators = this.container.querySelector('.carousel-indicators');
        
        navButtons.forEach(function(button) {
            button.remove();
        });
        
        if (indicators) {
            indicators.remove();
        }
        
        // Reset slide styles
        this.slides.forEach(function(slide) {
            slide.style.position = '';
            slide.style.top = '';
            slide.style.left = '';
            slide.style.width = '';
            slide.style.opacity = '';
            slide.style.transition = '';
            slide.removeAttribute('data-slide-index');
        });
        
        console.log('ImageCarousel: Destruction complete');
    };
    
    // ========================================================================
    // PUBLIC API
    // ========================================================================
    
    return ImageCarousel;
    
})();

// Log that carousel is loaded
console.log('Image Carousel module loaded successfully!');
console.warn('WARNING: This carousel code is loaded but not actually used on the page!');
