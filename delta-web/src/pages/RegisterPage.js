import { Page } from './Page.js';

export class RegisterPage extends Page {
  constructor(params = {}) {
    super();
    this.params = params;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'page register-page';
    
    const form = document.createElement('form');
    form.className = 'auth-form';
    form.innerHTML = `
      <div class="auth-card">
        <div class="auth-logo">Δ Delta</div>
        <h1>Create account</h1>
        <p class="auth-subtitle">Start your JEE journey with Delta</p>

        <div class="form-group">
          <label for="name">Full Name</label>
          <input type="text" id="name" name="name" required 
                 placeholder="John Doe" 
                 class="form-input" />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required 
                 placeholder="you@example.com" 
                 class="form-input" />
        </div>

        <div class="form-group">
          <label for="batch">Target Batch</label>
          <select id="batch" name="batch" class="form-input">
            <option value="JEE 2025">JEE 2025</option>
            <option value="JEE 2026">JEE 2026</option>
            <option value="JEE 2027">JEE 2027</option>
          </select>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required 
                 placeholder="••••••••" 
                 class="form-input" />
        </div>

        <div class="form-group">
          <label for="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" name="confirm-password" required 
                 placeholder="••••••••" 
                 class="form-input" />
        </div>

        <button type="submit" class="btn btn-primary btn-full">Create Account</button>

        <div class="auth-divider">
          <span>or</span>
        </div>

        <button type="button" class="btn btn-secondary btn-full">
          <svg class="icon" width="20" height="20"><use href="#google-icon"/></svg>
          Continue with Google
        </button>

        <p class="auth-footer">
          Already have an account? 
          <a href="#/login" class="auth-link">Sign In</a>
        </p>
      </div>
    `;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const password = form.querySelector('#password').value;
      const confirmPassword = form.querySelector('#confirm-password').value;
      
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      
      // Mock registration - redirect to login
      window.location.hash = '/login';
    });

    container.appendChild(form);
    return container;
  }
}

export default RegisterPage;
