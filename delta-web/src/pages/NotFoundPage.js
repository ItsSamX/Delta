import { Page } from './Page.js';

export class NotFoundPage extends Page {
  constructor(params = {}) {
    super();
    this.params = params;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'page not-found-page';
    
    container.innerHTML = `
      <div class="error-container">
        <div class="error-code">404</div>
        <h1>Page Not Found</h1>
        <p class="error-message">The page you're looking for doesn't exist or has been moved.</p>
        <button class="btn btn-primary" onclick="window.location.hash = '/'">
          Go Home
        </button>
      </div>
    `;
    
    return container;
  }
}

export default NotFoundPage;
