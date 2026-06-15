/**
 * Format Utilities
 */

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string}
 */
export function formatNumber(num) {
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Format large numbers (K, M, B)
 * @param {number} num - Number to format
 * @returns {string}
 */
export function formatCompact(num) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1
  }).format(num);
}

/**
 * Format percentage
 * @param {number} num - Number to format
 * @param {number} decimals - Decimal places
 * @returns {string}
 */
export function formatPercent(num, decimals = 0) {
  return `${num.toFixed(decimals)}%`;
}

/**
 * Format duration (seconds to mm:ss or hh:mm:ss)
 * @param {number} seconds - Duration in seconds
 * @returns {string}
 */
export function formatDuration(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format time remaining
 * @param {number} seconds - Seconds remaining
 * @returns {string}
 */
export function formatTimeRemaining(seconds) {
  if (seconds <= 0) return '00:00';
  
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format date
 * @param {Date|string|number} date - Date to format
 * @param {string} locale - Locale string
 * @returns {string}
 */
export function formatDate(date, locale = 'en-US') {
  const d = new Date(date);
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(d);
}

/**
 * Format relative time (e.g., "2 hours ago")
 * @param {Date|string|number} date - Date to format
 * @returns {string}
 */
export function formatRelativeTime(date) {
  const now = new Date();
  const d = new Date(date);
  const diffMs = now - d;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffSecs < 60) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return formatDate(date);
}

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code
 * @returns {string}
 */
export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount);
}

/**
 * Parse duration string to seconds
 * @param {string} str - Duration string (e.g., "1h 30m", "45m", "90s")
 * @returns {number}
 */
export function parseDuration(str) {
  if (!str) return 0;
  
  let seconds = 0;
  const parts = str.toLowerCase().match(/(\d+h)?\s*(\d+m)?\s*(\d+s)?/);
  
  if (parts) {
    if (parts[1]) seconds += parseInt(parts[1]) * 3600;
    if (parts[2]) seconds += parseInt(parts[2]) * 60;
    if (parts[3]) seconds += parseInt(parts[3]);
  }
  
  return seconds;
}

/**
 * Calculate progress percentage
 * @param {number} current - Current value
 * @param {number} total - Total value
 * @returns {number}
 */
export function calculateProgress(current, total) {
  if (total === 0) return 0;
  return Math.round((current / total) * 100);
}
