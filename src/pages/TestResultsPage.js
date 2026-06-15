import { Page } from './Page.js';

export class TestResultsPage extends Page {
  constructor(params = {}) {
    super();
    this.params = params;
    this.results = {
      score: 85,
      total: 100,
      correct: 17,
      incorrect: 3,
      percentile: 92,
      timeTaken: '32:45'
    };
  }

  render() {
    const testId = this.params.id || '1';
    
    const container = document.createElement('div');
    container.className = 'page test-results-page';
    
    const passed = this.results.score >= 50;
    
    container.innerHTML = `
      <div class="results-header">
        <div class="result-icon ${passed ? 'success' : 'error'}">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${passed ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><path d="M22 4 12 14.01l-3-3"></path>' : '<circle cx="12" cy="12" r="10"></circle><path d="M15 9l-6 6"></path><path d="M9 9l6 6"></path>'}
          </svg>
        </div>
        <h1>${passed ? 'Test Completed!' : 'Needs Improvement'}</h1>
        <p class="result-subtitle">${passed ? 'Great job! Keep up the momentum.' : 'Review your mistakes and try again.'}</p>
      </div>
      
      <div class="score-card">
        <div class="score-circle" style="--score: ${this.results.score}">
          <svg viewBox="0 0 36 36">
            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="3"/>
            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--brand)" stroke-width="3" stroke-dasharray="${this.results.score}, 100"/>
          </svg>
          <div class="score-value">${this.results.score}%</div>
        </div>
        
        <div class="score-details">
          <div class="score-stat">
            <span class="stat-value success">${this.results.correct}</span>
            <span class="stat-label">Correct</span>
          </div>
          <div class="score-stat">
            <span class="stat-value error">${this.results.incorrect}</span>
            <span class="stat-label">Incorrect</span>
          </div>
          <div class="score-stat">
            <span class="stat-value">${this.results.percentile}%</span>
            <span class="stat-label">Percentile</span>
          </div>
          <div class="score-stat">
            <span class="stat-value">${this.results.timeTaken}</span>
            <span class="stat-label">Time Taken</span>
          </div>
        </div>
      </div>
      
      <div class="results-actions">
        <button class="btn btn-primary btn-full">Review Answers</button>
        <button class="btn btn-secondary btn-full">Retake Test</button>
        <button class="btn btn-text btn-full">Back to Tests</button>
      </div>
    `;
    
    // Add navigation
    container.querySelector('.btn-text').addEventListener('click', () => {
      window.location.hash = '/tests';
    });
    
    return container;
  }
}

export default TestResultsPage;
