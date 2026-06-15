/**
 * Responsive Utilities
 */

const BREAKPOINTS = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  large: 1440
};

let currentBreakpoint = 'mobile';
let isDesktop = false;
const listeners = new Set();

/**
 * Get current breakpoint
 * @returns {string}
 */
export function getBreakpoint() {
  return currentBreakpoint;
}

/**
 * Check if current viewport matches breakpoint
 * @param {string} breakpoint - Breakpoint name
 * @returns {boolean}
 */
export function is(breakpoint) {
  return window.innerWidth >= BREAKPOINTS[breakpoint];
}

/**
 * Check if desktop
 * @returns {boolean}
 */
export function getIsDesktop() {
  return isDesktop;
}

/**
 * Initialize responsive detection
 * @param {Function} callback - Callback when breakpoint changes
 */
export function init(callback) {
  const checkBreakpoint = () => {
    const width = window.innerWidth;
    const oldBreakpoint = currentBreakpoint;
    const oldIsDesktop = isDesktop;
    
    if (width >= BREAKPOINTS.large) {
      currentBreakpoint = 'large';
    } else if (width >= BREAKPOINTS.desktop) {
      currentBreakpoint = 'desktop';
    } else if (width >= BREAKPOINTS.tablet) {
      currentBreakpoint = 'tablet';
    } else {
      currentBreakpoint = 'mobile';
    }
    
    isDesktop = width >= BREAKPOINTS.desktop;
    
    // Update body classes
    document.body.classList.remove('mobile', 'tablet', 'desktop', 'large');
    document.body.classList.add(currentBreakpoint);
    document.body.classList.toggle('desktop-view', isDesktop);
    document.body.classList.toggle('mobile-view', !isDesktop);
    
    // Notify listeners
    if (oldBreakpoint !== currentBreakpoint || oldIsDesktop !== isDesktop) {
      listeners.forEach(cb => cb({ breakpoint: currentBreakpoint, isDesktop }));
      
      if (callback) {
        callback(isDesktop);
      }
    }
  };
  
  // Initial check
  checkBreakpoint();
  
  // Listen for resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(checkBreakpoint, 100);
  });
  
  // Use ResizeObserver for better performance
  if (typeof ResizeObserver !== 'undefined') {
    const observer = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkBreakpoint, 100);
    });
    observer.observe(document.body);
  }
}

/**
 * Subscribe to breakpoint changes
 * @param {Function} callback - Callback function
 * @returns {Function} Unsubscribe function
 */
export function subscribe(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

/**
 * Match media query helper
 * @param {string} query - Media query
 * @returns {MediaQueryList}
 */
export function match(query) {
  return window.matchMedia(query);
}

// Default export as an object for convenient importing
export default {
  getBreakpoint,
  is,
  getIsDesktop,
  init,
  subscribe,
  match,
  BREAKPOINTS
};
