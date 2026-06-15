import { Page } from './Page.js';

export class LecturePlayerPage extends Page {
  constructor(params = {}) {
    super();
    this.params = params;
    this.lecture = null;
  }

  render() {
    const lectureId = this.params.id || '1';
    
    // Mock lecture data
    this.lecture = {
      id: lectureId,
      title: 'Electrostatics - Coulomb\'s Law and Electric Field',
      subject: 'Physics',
      teacher: 'Dr. Sharma',
      duration: '45 min',
      progress: 65,
      description: 'Learn about the fundamental force between charged particles and how to calculate electric fields.'
    };
    
    const container = document.createElement('div');
    container.className = 'page lecture-player-page';
    
    container.innerHTML = `
      <div class="video-container">
        <div class="video-placeholder">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <p>Video Player</p>
        </div>
      </div>
      
      <div class="lecture-info">
        <div class="lecture-header">
          <div>
            <h1>${this.lecture.title}</h1>
            <p class="lecture-meta">${this.lecture.subject} • ${this.lecture.teacher} • ${this.lecture.duration}</p>
          </div>
          <button class="btn btn-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>
        
        <div class="progress-section">
          <div class="progress-header">
            <span>Your Progress</span>
            <span>${this.lecture.progress}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-bar-fill" style="width: ${this.lecture.progress}%"></div>
          </div>
        </div>
        
        <div class="lecture-tabs">
          <button class="tab active">Overview</button>
          <button class="tab">Notes</button>
          <button class="tab">Resources</button>
          <button class="tab">Discussion</button>
        </div>
        
        <div class="tab-content">
          <h3>Description</h3>
          <p>${this.lecture.description}</p>
          
          <h3>Topics Covered</h3>
          <ul class="topics-list">
            <li>Coulomb's Law formula and applications</li>
            <li>Electric field due to point charges</li>
            <li>Superposition principle</li>
            <li>Electric field lines and properties</li>
          </ul>
        </div>
      </div>
    `;
    
    return container;
  }
}

export default LecturePlayerPage;
