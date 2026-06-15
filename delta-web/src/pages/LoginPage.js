import { Page } from './Page.js';
import { router } from '../router.js';
import { userStore } from '../data.js';
import { createElement } from '../utils/dom.js';

export class LoginPage extends Page {
  constructor(params = {}) {
    super();
    this.params = params;
  }

  render() {
    const container = createElement('div', { className: 'page login-page' });
    
    const form = createElement('form', { className: 'auth-form' });
    form.innerHTML = `
      <div class="auth-card">
        <div class="auth-logo">Δ Delta</div>
        <h1>Welcome back</h1>
        <p class="auth-subtitle">Sign in to continue your journey</p>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required 
                 placeholder="you@example.com" 
                 class="form-input" />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required 
                 placeholder="••••••••" 
                 class="form-input" />
        </div>

        <a href="#/forgot-password" class="auth-link">Forgot password?</a>

        <button type="submit" class="btn btn-primary btn-full">Sign In</button>

        <div class="auth-divider">
          <span>or</span>
        </div>

        <button type="button" class="btn btn-secondary btn-full">
          <svg class="icon" width="20" height="20"><use href="#google-icon"/></svg>
          Continue with Google
        </button>

        <p class="auth-footer">
          Don't have an account? 
          <a href="#/register" class="auth-link">Sign Up</a>
        </p>
      </div>
    `;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('#email').value;
      const password = form.querySelector('#password').value;

      // Mock auth - save user to localStorage
      userStore.set({ email, name: 'Jordan Doe', batch: 'JEE 2026' });
      
      // Update state and redirect
      router.push('/');
    });

    container.appendChild(form);
    return container;
  }
}

export default LoginPage;
