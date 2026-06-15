import { Page } from './Page.js';

export class SettingsPage extends Page {
  constructor(params = {}) {
    super();
    this.params = params;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'page settings-page';
    
    container.innerHTML = `
      <div class="page-header">
        <h1>Settings</h1>
        <p class="page-subtitle">Customize your experience</p>
      </div>
      
      <div class="settings-section">
        <h3>Appearance</h3>
        <div class="settings-list">
          <div class="settings-item">
            <span class="settings-icon">🌙</span>
            <span>Dark Mode</span>
            <label class="toggle">
              <input type="checkbox" checked disabled />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
      
      <div class="settings-section">
        <h3>Notifications</h3>
        <div class="settings-list">
          <div class="settings-item">
            <span class="settings-icon">📢</span>
            <span>Push Notifications</span>
            <label class="toggle">
              <input type="checkbox" checked />
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="settings-item">
            <span class="settings-icon">📧</span>
            <span>Email Reminders</span>
            <label class="toggle">
              <input type="checkbox" />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
      
      <div class="settings-section">
        <h3>Data</h3>
        <div class="settings-list">
          <button class="settings-item">
            <span class="settings-icon">💾</span>
            <span>Export Data</span>
            <span class="settings-arrow">›</span>
          </button>
          <button class="settings-item danger">
            <span class="settings-icon">🗑️</span>
            <span>Clear Cache</span>
          </button>
        </div>
      </div>
      
      <div class="settings-section">
        <h3>About</h3>
        <div class="settings-list">
          <div class="settings-item">
            <span class="settings-icon">ℹ️</span>
            <span>Version</span>
            <span class="settings-value">1.0.0</span>
          </div>
        </div>
      </div>
    `;
    
    // Add event listeners for toggles
    container.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        console.log('Setting changed:', e.target.checked);
        // Save to localStorage
      });
    });
    
    return container;
  }
}

export default SettingsPage;
