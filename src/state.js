/**
 * Central State Management (Proxy-based)
 */

const initialState = {
  currentTab: 'home',
  activeFilter: 'All',
  isDesktop: false,
  user: null,
  notifications: [],
  searchQuery: '',
  loading: false,
  toast: null
};

const state = { ...initialState };
const listeners = new Map();

/**
 * App state proxy with reactive updates
 */
export const appState = new Proxy(state, {
  set(target, key, value) {
    const oldValue = target[key];
    target[key] = value;

    if (oldValue !== value) {
      // Notify specific key listeners
      listeners.get(key)?.forEach(cb => cb(value, oldValue));
      // Notify wildcard listeners
      listeners.get('*')?.forEach(cb => cb(key, value, oldValue));
    }
    return true;
  },
  
  get(target, key) {
    return target[key];
  }
});

/**
 * Subscribe to state changes
 * @param {string} key - State key or '*' for all
 * @param {Function} callback - Callback function
 * @returns {Function} Unsubscribe function
 */
export function subscribe(key, callback) {
  if (!listeners.has(key)) {
    listeners.set(key, new Set());
  }
  listeners.get(key).add(callback);

  // Return unsubscribe function
  return () => {
    const keyListeners = listeners.get(key);
    if (keyListeners) {
      keyListeners.delete(callback);
      if (keyListeners.size === 0) {
        listeners.delete(key);
      }
    }
  };
}

/**
 * Update multiple state values at once
 * @param {Object} updates - Key-value pairs to update
 */
export function batchUpdate(updates) {
  Object.entries(updates).forEach(([key, value]) => {
    appState[key] = value;
  });
}

/**
 * Reset state to initial values
 */
export function resetState() {
  Object.keys(initialState).forEach(key => {
    appState[key] = initialState[key];
  });
}

/**
 * Get current state snapshot
 * @returns {Object}
 */
export function getStateSnapshot() {
  return { ...state };
}

/**
 * Show toast notification
 * @param {string} message - Toast message
 * @param {string} type - Toast type (success, error, info)
 * @param {number} duration - Duration in ms
 */
export function showToast(message, type = 'info', duration = 3000) {
  appState.toast = { message, type, id: Date.now() };
  
  setTimeout(() => {
    appState.toast = null;
  }, duration);
}
