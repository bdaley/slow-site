/**
 * Unused Script File
 * This file contains JavaScript that is NEVER used on the website
 * Author: Performance Test Website
 * Date: 2026-03-30
 * Version: 1.0.0
 * 
 * THIS FILE IS INTENTIONALLY UNUSED TO DEMONSTRATE PERFORMANCE WASTE
 * It will be loaded and parsed by the browser but none of these functions are called.
 * This represents a common performance problem where unused JavaScript is included.
 */

/**
 * Shopping cart functionality (not used - no e-commerce on this site!)
 * @namespace
 */
var ShoppingCart = {
    
    items: [],
    totalPrice: 0,
    
    /**
     * Add item to cart
     * @param {Object} productItem - Product to add
     */
    addItemToCart: function(productItem) {
        console.log('Adding item to cart:', productItem);
        
        var existingItemIndex = -1;
        
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].id === productItem.id) {
                existingItemIndex = i;
                break;
            }
        }
        
        if (existingItemIndex !== -1) {
            this.items[existingItemIndex].quantity += 1;
            console.log('Increased quantity of existing item');
        } else {
            this.items.push({
                id: productItem.id,
                name: productItem.name,
                price: productItem.price,
                quantity: 1
            });
            console.log('Added new item to cart');
        }
        
        this.calculateTotalPrice();
        this.updateCartDisplay();
    },
    
    /**
     * Remove item from cart
     * @param {string} productId - ID of product to remove
     */
    removeItemFromCart: function(productId) {
        console.log('Removing item from cart:', productId);
        
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].id === productId) {
                this.items.splice(i, 1);
                console.log('Item removed');
                break;
            }
        }
        
        this.calculateTotalPrice();
        this.updateCartDisplay();
    },
    
    /**
     * Calculate total price
     */
    calculateTotalPrice: function() {
        this.totalPrice = 0;
        
        for (var i = 0; i < this.items.length; i++) {
            this.totalPrice += this.items[i].price * this.items[i].quantity;
        }
        
        console.log('Total price calculated:', this.totalPrice);
    },
    
    /**
     * Update cart display
     */
    updateCartDisplay: function() {
        console.log('Updating cart display');
        // This would update the UI in a real implementation
    },
    
    /**
     * Clear cart
     */
    clearCart: function() {
        console.log('Clearing cart');
        this.items = [];
        this.totalPrice = 0;
        this.updateCartDisplay();
    }
};

/**
 * Video player functionality (not used - no videos on this site!)
 * @namespace
 */
var CustomVideoPlayer = {
    
    videoElement: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1.0,
    
    /**
     * Initialize video player
     * @param {string} videoSelector - CSS selector for video element
     */
    initialize: function(videoSelector) {
        console.log('Initializing video player for:', videoSelector);
        
        this.videoElement = document.querySelector(videoSelector);
        
        if (!this.videoElement) {
            console.error('Video element not found');
            return;
        }
        
        this.setupEventListeners();
        this.createCustomControls();
        
        console.log('Video player initialized');
    },
    
    /**
     * Setup event listeners
     */
    setupEventListeners: function() {
        var self = this;
        
        this.videoElement.addEventListener('play', function() {
            self.isPlaying = true;
            console.log('Video playing');
        });
        
        this.videoElement.addEventListener('pause', function() {
            self.isPlaying = false;
            console.log('Video paused');
        });
        
        this.videoElement.addEventListener('timeupdate', function() {
            self.currentTime = this.currentTime;
        });
        
        this.videoElement.addEventListener('loadedmetadata', function() {
            self.duration = this.duration;
            console.log('Video duration:', self.duration);
        });
    },
    
    /**
     * Create custom controls
     */
    createCustomControls: function() {
        console.log('Creating custom video controls');
        // This would create UI controls in a real implementation
    },
    
    /**
     * Play video
     */
    play: function() {
        console.log('Playing video');
        this.videoElement.play();
    },
    
    /**
     * Pause video
     */
    pause: function() {
        console.log('Pausing video');
        this.videoElement.pause();
    },
    
    /**
     * Toggle play/pause
     */
    togglePlayPause: function() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    },
    
    /**
     * Seek to time
     * @param {number} timeInSeconds - Time to seek to
     */
    seekTo: function(timeInSeconds) {
        console.log('Seeking to:', timeInSeconds);
        this.videoElement.currentTime = timeInSeconds;
    },
    
    /**
     * Set volume
     * @param {number} volumeLevel - Volume level (0-1)
     */
    setVolume: function(volumeLevel) {
        console.log('Setting volume to:', volumeLevel);
        this.volume = Math.max(0, Math.min(1, volumeLevel));
        this.videoElement.volume = this.volume;
    }
};

/**
 * Chat widget functionality (not used - no chat on this site!)
 * @namespace
 */
var ChatWidget = {
    
    isOpen: false,
    messages: [],
    
    /**
     * Initialize chat widget
     */
    initialize: function() {
        console.log('Initializing chat widget');
        this.createChatInterface();
        this.setupEventHandlers();
        console.log('Chat widget initialized');
    },
    
    /**
     * Create chat interface
     */
    createChatInterface: function() {
        console.log('Creating chat interface');
        // This would create the chat UI in a real implementation
    },
    
    /**
     * Setup event handlers
     */
    setupEventHandlers: function() {
        console.log('Setting up chat event handlers');
        // This would setup event listeners in a real implementation
    },
    
    /**
     * Open chat widget
     */
    open: function() {
        console.log('Opening chat widget');
        this.isOpen = true;
    },
    
    /**
     * Close chat widget
     */
    close: function() {
        console.log('Closing chat widget');
        this.isOpen = false;
    },
    
    /**
     * Send message
     * @param {string} messageText - Message to send
     */
    sendMessage: function(messageText) {
        console.log('Sending message:', messageText);
        
        this.messages.push({
            text: messageText,
            timestamp: new Date(),
            sender: 'user'
        });
        
        // Simulate bot response
        setTimeout(function() {
            ChatWidget.receiveMessage('Thank you for your message!');
        }, 1000);
    },
    
    /**
     * Receive message
     * @param {string} messageText - Message received
     */
    receiveMessage: function(messageText) {
        console.log('Receiving message:', messageText);
        
        this.messages.push({
            text: messageText,
            timestamp: new Date(),
            sender: 'bot'
        });
    }
};

/**
 * Data visualization functions (not used - no charts on this site!)
 * @namespace
 */
var DataVisualization = {
    
    /**
     * Create bar chart
     * @param {string} containerSelector - CSS selector for container
     * @param {Array} dataPoints - Data to visualize
     */
    createBarChart: function(containerSelector, dataPoints) {
        console.log('Creating bar chart in:', containerSelector);
        console.log('Data points:', dataPoints);
        
        // This would create a bar chart in a real implementation
        console.log('Bar chart created (simulated)');
    },
    
    /**
     * Create line chart
     * @param {string} containerSelector - CSS selector for container
     * @param {Array} dataPoints - Data to visualize
     */
    createLineChart: function(containerSelector, dataPoints) {
        console.log('Creating line chart in:', containerSelector);
        console.log('Data points:', dataPoints);
        
        // This would create a line chart in a real implementation
        console.log('Line chart created (simulated)');
    },
    
    /**
     * Create pie chart
     * @param {string} containerSelector - CSS selector for container
     * @param {Array} dataPoints - Data to visualize
     */
    createPieChart: function(containerSelector, dataPoints) {
        console.log('Creating pie chart in:', containerSelector);
        console.log('Data points:', dataPoints);
        
        // This would create a pie chart in a real implementation
        console.log('Pie chart created (simulated)');
    }
};

/**
 * Social media sharing functions (not used!)
 * @namespace
 */
var SocialMediaSharing = {
    
    /**
     * Share on Facebook
     * @param {string} urlToShare - URL to share
     */
    shareOnFacebook: function(urlToShare) {
        console.log('Sharing on Facebook:', urlToShare);
        var facebookShareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(urlToShare);
        window.open(facebookShareUrl, '_blank', 'width=600,height=400');
    },
    
    /**
     * Share on Twitter
     * @param {string} urlToShare - URL to share
     * @param {string} tweetText - Tweet text
     */
    shareOnTwitter: function(urlToShare, tweetText) {
        console.log('Sharing on Twitter:', urlToShare);
        var twitterShareUrl = 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(urlToShare) + '&text=' + encodeURIComponent(tweetText);
        window.open(twitterShareUrl, '_blank', 'width=600,height=400');
    },
    
    /**
     * Share on LinkedIn
     * @param {string} urlToShare - URL to share
     */
    shareOnLinkedIn: function(urlToShare) {
        console.log('Sharing on LinkedIn:', urlToShare);
        var linkedInShareUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(urlToShare);
        window.open(linkedInShareUrl, '_blank', 'width=600,height=400');
    }
};

// Log when unused script file has loaded
console.log('Unused-script.js file has loaded successfully');
console.log('This file contains code that is never used on the page - wasting bandwidth and parse time!');
