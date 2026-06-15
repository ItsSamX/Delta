import { Page } from './Page.js';

export class ProfilePage extends Page {
  constructor(params = {}) {
    super();
    this.params = params;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'page profile-page';
    
    // Mock user data
    const user = { name: 'Jordan Doe', email: 'jordan@example.com', batch: 'JEE 2026' };
    
    container.innerHTML = `
      <div class="page-header">
        <h1>Profile</h1>
        <p class="page-subtitle">Manage your account</p>
      </div>
      
      <div class="profile-card">
        <div class="profile-avatar">
          <span>${user.name.charAt(0)}</span>
        </div>
        <div class="profile-info">
          <h2>${user.name}</h2>
          <p class="profile-batch">${user.batch}</p>
          <p class="profile-email">${user.email}</p>
        </div>
      </div>
      
      <div class="settings-section">
        <h3>Account Settings</h3>
        <div class="settings-list">
          <button class="settings-item">
            <span class="settings-icon">👤</span>
            <span>Edit Profile</span>
            <span class="settings-arrow">›</span>
          </button>
          <button class="settings-item">
            <span class="settings-icon">🔔</span>
            <span>Notifications</span>
            <span class="settings-arrow">›</span>
          </button>
          <button class="settings-item">
            <span class="settings-icon">🔒</span>
            <span>Privacy</span>
            <span class="settings-arrow">›</span>
          </button>
        </div>
      </div>
      
      <div class="settings-section">
        <h3>Study Stats</h3>
        <div class="stats-grid">
          <div class="stat-mini">
            <span class="stat-value">142</span>
            <span class="stat-label">Lectures</span>
          </div>
          <div class="stat-mini">
            <span class="stat-value">89h</span>
            <span class="stat-label">Hours</span>
          </div>
          <div class="stat-mini">
            <span class="stat-value">23</span>
            <span class="stat-label">Tests</span>
          </div>
          <div class="stat-mini">
            <span class="stat-value">12</span>
            <span class="stat-label">Streak</span>
          </div>
        </div>
      </div>
    `;
    
    return container;
  }
}

export default ProfilePage;
