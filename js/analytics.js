/**
 * Analytics JavaScript File
 * This file contains fake analytics tracking functionality
 * Author: Performance Test Website
 * Date: 2026-03-30
 * Version: 1.0.0
 * 
 * This is another render-blocking JavaScript file that simulates
 * analytics tracking. It's loaded synchronously in the <head> which
 * blocks page rendering - a common performance anti-pattern.
 */

window.WebsiteAnalytics = (function() {
    'use strict';
    
    // ========================================================================
    // ANALYTICS CONFIGURATION
    // ========================================================================
    
    const TRACKING_ID = 'UA-FAKE-123456';
    const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
    const BATCH_SIZE = 10;
    const SEND_INTERVAL = 5000; // 5 seconds
    
    let sessionId = null;
    let userId = null;
    let eventsQueue = [];
    let sendTimer = null;
    let pageLoadTime = null;
    let sessionStartTime = null;
    
    // ========================================================================
    // INITIALIZATION
    // ========================================================================
    
    /**
     * Initialize analytics tracking
     */
    function init() {
        console.log('Analytics: Initializing tracking system');
        console.log('Analytics: Tracking ID:', TRACKING_ID);
        
        // Generate or retrieve session ID
        sessionId = getSessionId();
        userId = getUserId();
        sessionStartTime = new Date().getTime();
        
        console.log('Analytics: Session ID:', sessionId);
        console.log('Analytics: User ID:', userId);
        
        // Track page load
        trackPageLoad();
        
        // Set up event listeners for automatic tracking
        setupEventListeners();
        
        // Start periodic sending of queued events
        startBatchSending();
        
        console.log('Analytics: Initialization complete');
    }
    
    /**
     * Get or create session ID
     * @returns {string} Session ID
     */
    function getSessionId() {
        let id = sessionStorage.getItem('analytics_session_id');
        
        if (!id) {
            id = generateUniqueId();
            sessionStorage.setItem('analytics_session_id', id);
            console.log('Analytics: Created new session ID:', id);
        } else {
            console.log('Analytics: Retrieved existing session ID:', id);
        }
        
        return id;
    }
    
    /**
     * Get or create user ID
     * @returns {string} User ID
     */
    function getUserId() {
        let id = localStorage.getItem('analytics_user_id');
        
        if (!id) {
            id = generateUniqueId();
            localStorage.setItem('analytics_user_id', id);
            console.log('Analytics: Created new user ID:', id);
        } else {
            console.log('Analytics: Retrieved existing user ID:', id);
        }
        
        return id;
    }
    
    /**
     * Generate a unique ID
     * @returns {string} Unique identifier
     */
    function generateUniqueId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    
    // ========================================================================
    // PAGE TRACKING
    // ========================================================================
    
    /**
     * Track page load event
     */
    function trackPageLoad() {
        const eventData = {
            eventType: 'pageview',
            page: window.location.pathname,
            title: document.title,
            referrer: document.referrer,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            screenResolution: window.screen.width + 'x' + window.screen.height,
            viewportSize: window.innerWidth + 'x' + window.innerHeight,
            language: navigator.language
        };
        
        console.log('Analytics: Tracking page view', eventData);
        queueEvent(eventData);
        
        // Also track performance metrics when available
        window.addEventListener('load', function() {
            setTimeout(trackPerformanceMetrics, 1000);
        });
    }
    
    /**
     * Track performance metrics
     */
    function trackPerformanceMetrics() {
        if (!window.performance || !window.performance.timing) {
            console.warn('Analytics: Performance API not available');
            return;
        }
        
        const perfData = window.performance.timing;
        pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        const performanceData = {
            eventType: 'performance',
            pageLoadTime: pageLoadTime,
            domReadyTime: perfData.domContentLoadedEventEnd - perfData.navigationStart,
            domInteractive: perfData.domInteractive - perfData.navigationStart,
            connectTime: perfData.responseEnd - perfData.requestStart,
            renderTime: perfData.domComplete - perfData.domLoading,
            timestamp: new Date().toISOString()
        };
        
        console.log('Analytics: Tracking performance metrics', performanceData);
        queueEvent(performanceData);
        
        // Track resource timings
        if (window.performance.getEntriesByType) {
            const resources = window.performance.getEntriesByType('resource');
            const resourceSummary = {
                eventType: 'resources',
                totalResources: resources.length,
                totalDuration: resources.reduce(function(sum, r) { return sum + r.duration; }, 0),
                timestamp: new Date().toISOString()
            };
            
            console.log('Analytics: Tracking resource metrics', resourceSummary);
            queueEvent(resourceSummary);
        }
    }
    
    // ========================================================================
    // EVENT TRACKING
    // ========================================================================
    
    /**
     * Track a custom event
     * @param {string} category - Event category
     * @param {string} action - Event action
     * @param {string} label - Event label (optional)
     * @param {number} value - Event value (optional)
     */
    function trackEvent(category, action, label, value) {
        const eventData = {
            eventType: 'event',
            category: category,
            action: action,
            label: label || '',
            value: value || 0,
            timestamp: new Date().toISOString()
        };
        
        console.log('Analytics: Tracking event', eventData);
        queueEvent(eventData);
    }
    
    /**
     * Track a click event
     * @param {HTMLElement} element - Clicked element
     */
    function trackClick(element) {
        const eventData = {
            eventType: 'click',
            elementType: element.tagName.toLowerCase(),
            elementId: element.id || '',
            elementClass: element.className || '',
            elementText: element.textContent ? element.textContent.substring(0, 100) : '',
            timestamp: new Date().toISOString()
        };
        
        console.log('Analytics: Tracking click', eventData);
        queueEvent(eventData);
    }
    
    /**
     * Track form submission
     * @param {HTMLFormElement} form - Submitted form
     */
    function trackFormSubmit(form) {
        const eventData = {
            eventType: 'form_submit',
            formId: form.id || '',
            formClass: form.className || '',
            formAction: form.action || '',
            timestamp: new Date().toISOString()
        };
        
        console.log('Analytics: Tracking form submission', eventData);
        queueEvent(eventData);
    }
    
    /**
     * Track scroll depth
     * @param {number} depth - Scroll depth percentage
     */
    function trackScrollDepth(depth) {
        const eventData = {
            eventType: 'scroll',
            depth: depth,
            timestamp: new Date().toISOString()
        };
        
        console.log('Analytics: Tracking scroll depth', depth + '%');
        queueEvent(eventData);
    }
    
    // ========================================================================
    // AUTOMATIC EVENT TRACKING
    // ========================================================================
    
    /**
     * Set up automatic event listeners
     */
    function setupEventListeners() {
        console.log('Analytics: Setting up automatic event tracking');
        
        // Track all clicks
        document.addEventListener('click', function(event) {
            if (event.target) {
                trackClick(event.target);
            }
        }, true);
        
        // Track form submissions
        document.addEventListener('submit', function(event) {
            if (event.target && event.target.tagName === 'FORM') {
                trackFormSubmit(event.target);
            }
        }, true);
        
        // Track scroll depth
        let maxScrollDepth = 0;
        const scrollMilestones = [25, 50, 75, 100];
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = Math.round((scrollTop / docHeight) * 100);
            
            if (scrollPercent > maxScrollDepth) {
                maxScrollDepth = scrollPercent;
                
                scrollMilestones.forEach(function(milestone) {
                    if (scrollPercent >= milestone && maxScrollDepth < milestone + 1) {
                        trackScrollDepth(milestone);
                    }
                });
            }
        });
        
        // Track page visibility changes
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                trackEvent('engagement', 'page_hidden', '', 0);
            } else {
                trackEvent('engagement', 'page_visible', '', 0);
            }
        });
        
        // Track session end on page unload
        window.addEventListener('beforeunload', function() {
            const sessionDuration = new Date().getTime() - sessionStartTime;
            trackEvent('session', 'end', '', Math.round(sessionDuration / 1000));
            sendQueuedEvents(); // Try to send remaining events
        });
        
        console.log('Analytics: Automatic event tracking configured');
    }
    
    // ========================================================================
    // QUEUE MANAGEMENT
    // ========================================================================
    
    /**
     * Add event to queue
     * @param {Object} eventData - Event data
     */
    function queueEvent(eventData) {
        // Add common fields
        eventData.sessionId = sessionId;
        eventData.userId = userId;
        
        eventsQueue.push(eventData);
        console.log('Analytics: Event queued. Queue size:', eventsQueue.length);
        
        // Send immediately if queue is full
        if (eventsQueue.length >= BATCH_SIZE) {
            console.log('Analytics: Queue full, sending batch');
            sendQueuedEvents();
        }
    }
    
    /**
     * Send queued events to server
     */
    function sendQueuedEvents() {
        if (eventsQueue.length === 0) {
            return;
        }
        
        console.log('Analytics: Sending', eventsQueue.length, 'queued events');
        
        // In a real implementation, this would send to an analytics server
        // For this demo, we just log them
        console.log('Analytics: Events batch:', JSON.stringify(eventsQueue, null, 2));
        
        // Simulate network request
        console.log('Analytics: (Simulated network request - not actually sending)');
        
        // Clear queue
        eventsQueue = [];
    }
    
    /**
     * Start periodic batch sending
     */
    function startBatchSending() {
        sendTimer = setInterval(function() {
            if (eventsQueue.length > 0) {
                sendQueuedEvents();
            }
        }, SEND_INTERVAL);
        
        console.log('Analytics: Started batch sending with interval:', SEND_INTERVAL, 'ms');
    }
    
    // ========================================================================
    // PUBLIC API
    // ========================================================================
    
    return {
        init: init,
        trackEvent: trackEvent,
        trackPageView: trackPageLoad,
        track: trackEvent
    };
    
})();

// Auto-initialize analytics
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        WebsiteAnalytics.init();
    });
} else {
    WebsiteAnalytics.init();
}

console.log('Analytics module loaded');
console.log('WARNING: This analytics script is render-blocking!');
