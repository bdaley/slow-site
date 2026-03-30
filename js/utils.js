/**
 * Utility Functions JavaScript File
 * This file contains various utility functions used throughout the website
 * Author: Performance Test Website
 * Date: 2026-03-30
 * Version: 1.0.0
 * 
 * This is a separate JavaScript file to add additional HTTP requests
 * and demonstrate render-blocking issues with multiple JS files.
 */

// Create a global utilities namespace
window.WebsiteUtils = (function() {
    'use strict';
    
    // ========================================================================
    // STRING UTILITIES
    // ========================================================================
    
    /**
     * Capitalize the first letter of a string
     * @param {string} str - The input string
     * @returns {string} The capitalized string
     */
    function capitalizeFirstLetter(str) {
        if (!str || typeof str !== 'string') {
            console.warn('capitalizeFirstLetter: Invalid input');
            return '';
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    /**
     * Convert a string to title case
     * @param {string} str - The input string
     * @returns {string} The title cased string
     */
    function toTitleCase(str) {
        if (!str || typeof str !== 'string') {
            console.warn('toTitleCase: Invalid input');
            return '';
        }
        return str.toLowerCase().split(' ').map(function(word) {
            return capitalizeFirstLetter(word);
        }).join(' ');
    }
    
    /**
     * Truncate a string to a specified length
     * @param {string} str - The input string
     * @param {number} maxLength - Maximum length
     * @param {string} suffix - Suffix to add if truncated (default: '...')
     * @returns {string} The truncated string
     */
    function truncateString(str, maxLength, suffix) {
        suffix = suffix || '...';
        
        if (!str || typeof str !== 'string') {
            console.warn('truncateString: Invalid input');
            return '';
        }
        
        if (str.length <= maxLength) {
            return str;
        }
        
        return str.substring(0, maxLength - suffix.length) + suffix;
    }
    
    /**
     * Remove HTML tags from a string
     * @param {string} str - The input string
     * @returns {string} The string without HTML tags
     */
    function stripHtmlTags(str) {
        if (!str || typeof str !== 'string') {
            console.warn('stripHtmlTags: Invalid input');
            return '';
        }
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = str;
        return tempDiv.textContent || tempDiv.innerText || '';
    }
    
    // ========================================================================
    // ARRAY UTILITIES
    // ========================================================================
    
    /**
     * Shuffle an array randomly
     * @param {Array} array - The input array
     * @returns {Array} A new shuffled array
     */
    function shuffleArray(array) {
        if (!Array.isArray(array)) {
            console.warn('shuffleArray: Input is not an array');
            return [];
        }
        
        const shuffled = array.slice();
        
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = shuffled[i];
            shuffled[i] = shuffled[j];
            shuffled[j] = temp;
        }
        
        return shuffled;
    }
    
    /**
     * Get unique values from an array
     * @param {Array} array - The input array
     * @returns {Array} Array with unique values only
     */
    function getUniqueValues(array) {
        if (!Array.isArray(array)) {
            console.warn('getUniqueValues: Input is not an array');
            return [];
        }
        
        return array.filter(function(value, index, self) {
            return self.indexOf(value) === index;
        });
    }
    
    /**
     * Chunk an array into smaller arrays of specified size
     * @param {Array} array - The input array
     * @param {number} size - The chunk size
     * @returns {Array} Array of chunks
     */
    function chunkArray(array, size) {
        if (!Array.isArray(array)) {
            console.warn('chunkArray: Input is not an array');
            return [];
        }
        
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    }
    
    // ========================================================================
    // NUMBER UTILITIES
    // ========================================================================
    
    /**
     * Format a number with thousands separators
     * @param {number} num - The input number
     * @returns {string} Formatted number string
     */
    function formatNumber(num) {
        if (typeof num !== 'number' && typeof num !== 'string') {
            console.warn('formatNumber: Invalid input');
            return '0';
        }
        
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    /**
     * Generate a random number between min and max
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Random number
     */
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    /**
     * Round a number to specified decimal places
     * @param {number} num - The input number
     * @param {number} decimals - Number of decimal places
     * @returns {number} Rounded number
     */
    function roundToDecimals(num, decimals) {
        const multiplier = Math.pow(10, decimals);
        return Math.round(num * multiplier) / multiplier;
    }
    
    // ========================================================================
    // DATE UTILITIES
    // ========================================================================
    
    /**
     * Format a date object to a readable string
     * @param {Date} date - The input date
     * @param {string} format - Format string (default: 'YYYY-MM-DD')
     * @returns {string} Formatted date string
     */
    function formatDate(date, format) {
        if (!(date instanceof Date) || isNaN(date)) {
            console.warn('formatDate: Invalid date');
            return '';
        }
        
        format = format || 'YYYY-MM-DD';
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hours)
            .replace('mm', minutes)
            .replace('ss', seconds);
    }
    
    /**
     * Get the difference between two dates in days
     * @param {Date} date1 - First date
     * @param {Date} date2 - Second date
     * @returns {number} Number of days difference
     */
    function getDaysDifference(date1, date2) {
        if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
            console.warn('getDaysDifference: Invalid dates');
            return 0;
        }
        
        const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
        return Math.round(Math.abs((date1 - date2) / oneDay));
    }
    
    // ========================================================================
    // DOM UTILITIES
    // ========================================================================
    
    /**
     * Add a class to an element
     * @param {HTMLElement} element - The DOM element
     * @param {string} className - The class name to add
     */
    function addClass(element, className) {
        if (!element || !className) {
            console.warn('addClass: Invalid parameters');
            return;
        }
        
        if (element.classList) {
            element.classList.add(className);
        } else {
            element.className += ' ' + className;
        }
    }
    
    /**
     * Remove a class from an element
     * @param {HTMLElement} element - The DOM element
     * @param {string} className - The class name to remove
     */
    function removeClass(element, className) {
        if (!element || !className) {
            console.warn('removeClass: Invalid parameters');
            return;
        }
        
        if (element.classList) {
            element.classList.remove(className);
        } else {
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }
    
    /**
     * Toggle a class on an element
     * @param {HTMLElement} element - The DOM element
     * @param {string} className - The class name to toggle
     */
    function toggleClass(element, className) {
        if (!element || !className) {
            console.warn('toggleClass: Invalid parameters');
            return;
        }
        
        if (element.classList) {
            element.classList.toggle(className);
        } else {
            if (element.className.indexOf(className) >= 0) {
                removeClass(element, className);
            } else {
                addClass(element, className);
            }
        }
    }
    
    /**
     * Check if an element has a specific class
     * @param {HTMLElement} element - The DOM element
     * @param {string} className - The class name to check
     * @returns {boolean} True if element has the class
     */
    function hasClass(element, className) {
        if (!element || !className) {
            console.warn('hasClass: Invalid parameters');
            return false;
        }
        
        if (element.classList) {
            return element.classList.contains(className);
        } else {
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
        }
    }
    
    // ========================================================================
    // LOCAL STORAGE UTILITIES
    // ========================================================================
    
    /**
     * Save data to localStorage
     * @param {string} key - The storage key
     * @param {*} value - The value to store
     */
    function saveToStorage(key, value) {
        if (!key) {
            console.warn('saveToStorage: Key is required');
            return;
        }
        
        try {
            const serialized = JSON.stringify(value);
            localStorage.setItem(key, serialized);
            console.log('Saved to storage:', key);
        } catch (error) {
            console.error('Error saving to storage:', error);
        }
    }
    
    /**
     * Retrieve data from localStorage
     * @param {string} key - The storage key
     * @returns {*} The stored value or null
     */
    function getFromStorage(key) {
        if (!key) {
            console.warn('getFromStorage: Key is required');
            return null;
        }
        
        try {
            const serialized = localStorage.getItem(key);
            if (serialized === null) {
                return null;
            }
            return JSON.parse(serialized);
        } catch (error) {
            console.error('Error reading from storage:', error);
            return null;
        }
    }
    
    /**
     * Remove data from localStorage
     * @param {string} key - The storage key
     */
    function removeFromStorage(key) {
        if (!key) {
            console.warn('removeFromStorage: Key is required');
            return;
        }
        
        try {
            localStorage.removeItem(key);
            console.log('Removed from storage:', key);
        } catch (error) {
            console.error('Error removing from storage:', error);
        }
    }
    
    // ========================================================================
    // VALIDATION UTILITIES
    // ========================================================================
    
    /**
     * Validate an email address
     * @param {string} email - The email address to validate
     * @returns {boolean} True if valid
     */
    function isValidEmail(email) {
        if (!email || typeof email !== 'string') {
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    /**
     * Validate a URL
     * @param {string} url - The URL to validate
     * @returns {boolean} True if valid
     */
    function isValidUrl(url) {
        if (!url || typeof url !== 'string') {
            return false;
        }
        
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    }
    
    /**
     * Validate a phone number (basic validation)
     * @param {string} phone - The phone number to validate
     * @returns {boolean} True if valid
     */
    function isValidPhone(phone) {
        if (!phone || typeof phone !== 'string') {
            return false;
        }
        
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }
    
    // ========================================================================
    // PUBLIC API
    // ========================================================================
    
    return {
        // String utilities
        capitalizeFirstLetter: capitalizeFirstLetter,
        toTitleCase: toTitleCase,
        truncateString: truncateString,
        stripHtmlTags: stripHtmlTags,
        
        // Array utilities
        shuffleArray: shuffleArray,
        getUniqueValues: getUniqueValues,
        chunkArray: chunkArray,
        
        // Number utilities
        formatNumber: formatNumber,
        getRandomNumber: getRandomNumber,
        roundToDecimals: roundToDecimals,
        
        // Date utilities
        formatDate: formatDate,
        getDaysDifference: getDaysDifference,
        
        // DOM utilities
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        hasClass: hasClass,
        
        // Storage utilities
        saveToStorage: saveToStorage,
        getFromStorage: getFromStorage,
        removeFromStorage: removeFromStorage,
        
        // Validation utilities
        isValidEmail: isValidEmail,
        isValidUrl: isValidUrl,
        isValidPhone: isValidPhone
    };
    
})();

// Log that utilities are loaded
console.log('Website utilities loaded successfully!');
console.log('Available utilities:', Object.keys(window.WebsiteUtils));
