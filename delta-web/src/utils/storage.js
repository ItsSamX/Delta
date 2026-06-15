/**
 * Storage Utilities (localStorage wrapper)
 */

const PREFIX = 'delta_';

/**
 * Get item from localStorage
 * @param {string} key - Storage key
 * @returns {any|null}
 */
export function get(key) {
  try {
    const item = localStorage.getItem(`${PREFIX}${key}`);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error('Error reading from localStorage:', e);
    return null;
  }
}

/**
 * Set item in localStorage
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 * @returns {boolean}
 */
export function set(key, value) {
  try {
    localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error('Error writing to localStorage:', e);
    return false;
  }
}

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 * @returns {boolean}
 */
export function remove(key) {
  try {
    localStorage.removeItem(`${PREFIX}${key}`);
    return true;
  } catch (e) {
    console.error('Error removing from localStorage:', e);
    return false;
  }
}

/**
 * Clear all delta items from localStorage
 * @returns {boolean}
 */
export function clear() {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(PREFIX)) {
        localStorage.removeItem(key);
      }
    });
    return true;
  } catch (e) {
    console.error('Error clearing localStorage:', e);
    return false;
  }
}

/**
 * Check if key exists
 * @param {string} key - Storage key
 * @returns {boolean}
 */
export function has(key) {
  return localStorage.getItem(`${PREFIX}${key}`) !== null;
}

/**
 * User store
 */
export const userStore = {
  get() {
    return get('user');
  },
  set(user) {
    return set('user', user);
  },
  clear() {
    return remove('user');
  },
  isAuthenticated() {
    return this.get() !== null;
  }
};

/**
 * Notes store
 */
export const notesStore = {
  getAll() {
    return get('notes') || [];
  },
  add(note) {
    const notes = this.getAll();
    const newNote = {
      ...note,
      id: Date.now(),
      date: new Date().toLocaleDateString()
    };
    notes.unshift(newNote);
    set('notes', notes);
    return newNote;
  },
  update(id, updates) {
    const notes = this.getAll();
    const index = notes.findIndex(n => n.id === id);
    if (index !== -1) {
      notes[index] = { ...notes[index], ...updates };
      set('notes', notes);
      return notes[index];
    }
    return null;
  },
  delete(id) {
    const notes = this.getAll().filter(n => n.id !== id);
    set('notes', notes);
    return true;
  },
  getById(id) {
    return this.getAll().find(n => n.id === id);
  }
};

/**
 * Settings store
 */
export const settingsStore = {
  get() {
    return get('settings') || {
      notifications: true,
      darkMode: true,
      soundEnabled: true,
      downloadQuality: 'high'
    };
  },
  set(settings) {
    return set('settings', { ...this.get(), ...settings });
  },
  getSetting(key) {
    const settings = this.get();
    return settings[key];
  },
  setSetting(key, value) {
    return this.set({ [key]: value });
  }
};

/**
 * Downloads store
 */
export const downloadsStore = {
  getAll() {
    return get('downloads') || [];
  },
  add(download) {
    const downloads = this.getAll();
    downloads.push({
      ...download,
      id: Date.now(),
      downloadedAt: new Date().toISOString()
    });
    set('downloads', downloads);
    return true;
  },
  remove(id) {
    const downloads = this.getAll().filter(d => d.id !== id);
    set('downloads', downloads);
    return true;
  },
  isDownloaded(lectureId) {
    return this.getAll().some(d => d.lectureId === lectureId);
  }
};

/**
 * Search history store
 */
export const searchHistoryStore = {
  getAll() {
    return get('searchHistory') || [];
  },
  add(query) {
    if (!query.trim()) return;
    
    const history = this.getAll();
    const filtered = history.filter(h => h.toLowerCase() !== query.toLowerCase());
    filtered.unshift({
      query,
      timestamp: Date.now()
    });
    
    // Keep only last 10 searches
    set('searchHistory', filtered.slice(0, 10));
  },
  clear() {
    return remove('searchHistory');
  }
};

/**
 * Filter state persistence
 */
export const filterStore = {
  get(key, defaultValue) {
    const filters = get('filters') || {};
    return filters[key] ?? defaultValue;
  },
  set(key, value) {
    const filters = get('filters') || {};
    filters[key] = value;
    return set('filters', filters);
  }
};

/**
 * Test progress store
 */
export const testProgressStore = {
  save(testId, answers, currentQuestion) {
    const progress = get('testProgress') || {};
    progress[testId] = {
      answers,
      currentQuestion,
      savedAt: Date.now()
    };
    return set('testProgress', progress);
  },
  get(testId) {
    const progress = get('testProgress') || {};
    return progress[testId] || null;
  },
  clear(testId) {
    if (testId) {
      const progress = get('testProgress') || {};
      delete progress[testId];
      return set('testProgress', progress);
    }
    return remove('testProgress');
  }
};
