import { Page } from './Page.js';

export class TestTakingPage extends Page {
  constructor(params = {}) {
    super();
    this.params = params;
    this.currentQuestion = 0;
    this.answers = {};
    this.questions = [
      { id: 1, text: 'What is the unit of electric field?', options: ['N/C', 'V/m', 'Both A and B', 'None'], correct: 2 },
      { id: 2, text: 'Coulomb\'s law is valid for:', options: ['Point charges', 'Large spheres', 'Any shape', 'Only positive charges'], correct: 0 },
      { id: 3, text: 'Electric field lines originate from:', options: ['Negative charge', 'Positive charge', 'Both', 'Neither'], correct: 1 },
      { id: 4, text: 'The principle of superposition applies to:', options: ['Only electric fields', 'Only forces', 'Both', 'Neither'], correct: 2 },
      { id: 5, text: 'Electric dipole moment is a:', options: ['Scalar', 'Vector', 'Tensor', 'None'], correct: 1 },
    ];
  }

  render() {
    const testId = this.params.id || '1';
    
    const container = document.createElement('div');
    container.className = 'page test-taking-page';
    
    container.innerHTML = `
      <div class="test-header">
        <div>
          <h1>Physics Mock Test 1</h1>
          <p class="test-meta">Question ${this.currentQuestion + 1} of ${this.questions.length} • Electrostatics</p>
        </div>
        <div class="test-timer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 6v6l4 2"></path>
          </svg>
          <span>45:00</span>
        </div>
      </div>
      
      <div class="question-container">
        <div class="question-text">${this.questions[this.currentQuestion].text}</div>
        
        <div class="options-grid">
          ${this.questions[this.currentQuestion].options.map((opt, i) => `
            <button class="option-btn ${this.answers[this.currentQuestion] === i ? 'selected' : ''}" data-index="${i}">
              <span class="option-label">${String.fromCharCode(65 + i)}</span>
              <span class="option-text">${opt}</span>
            </button>
          `).join('')}
        </div>
      </div>
      
      <div class="question-nav">
        <button class="btn btn-secondary" ${this.currentQuestion === 0 ? 'disabled' : ''}>Previous</button>
        <div class="question-dots">
          ${this.questions.map((_, i) => `
            <span class="question-dot ${i === this.currentQuestion ? 'active' : ''} ${this.answers[i] !== undefined ? 'answered' : ''}"></span>
          `).join('')}
        </div>
        <button class="btn btn-primary">${this.currentQuestion === this.questions.length - 1 ? 'Submit Test' : 'Next'}</button>
      </div>
    `;
    
    // Add event listeners
    container.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index);
        this.answers[this.currentQuestion] = index;
        
        // Update UI
        container.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
    
    container.querySelector('.question-nav .btn-secondary').addEventListener('click', () => {
      if (this.currentQuestion > 0) {
        this.currentQuestion--;
        this.refresh();
      }
    });
    
    const nextBtn = container.querySelector('.question-nav .btn-primary');
    nextBtn.addEventListener('click', () => {
      if (this.currentQuestion === this.questions.length - 1) {
        // Submit test
        window.location.hash = `/results/${testId}`;
      } else {
        this.currentQuestion++;
        this.refresh();
      }
    });
    
    return container;
  }
  
  refresh() {
    const main = document.getElementById('main-content');
    if (main) {
      main.innerHTML = '';
      main.appendChild(this.render());
    }
  }
}

export default TestTakingPage;
