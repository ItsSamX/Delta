/**
 * SPA Router (Hash-based)
 */

const routes = {
  '/': () => import('./pages/HomePage.js'),
  '/classes': () => import('./pages/ClassesPage.js'),
  '/tests': () => import('./pages/TestsPage.js'),
  '/notes': () => import('./pages/NotesPage.js'),
  '/dashboard': () => import('./pages/DashboardPage.js'),
  '/login': () => import('./pages/LoginPage.js'),
  '/register': () => import('./pages/RegisterPage.js'),
  '/profile': () => import('./pages/ProfilePage.js'),
  '/settings': () => import('./pages/SettingsPage.js'),
  '/notifications': () => import('./pages/NotificationsPage.js'),
  '/search': () => import('./pages/SearchPage.js'),
  '/lecture/:id': () => import('./pages/LecturePlayerPage.js'),
  '/test/:id': () => import('./pages/TestTakingPage.js'),
  '/results/:id': () => import('./pages/TestResultsPage.js'),
};

class Router {
  constructor() {
    this.currentRoute = null;
    this.params = {};
    this.history = [];
    
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('popstate', () => this.handleRoute());
  }

  /**
   * Handle route change
   */
  handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const [path, queryString] = hash.split('?');
    
    // Parse query params
    this.queryParams = this.parseQueryParams(queryString);
    
    // Match route with params
    const route = this.matchRoute(path);
    
    if (route) {
      this.navigate(route.loader, route.params, path);
    } else {
      this.navigate(() => import('./pages/NotFoundPage.js'), {}, '/404');
    }
  }

  /**
   * Parse query string to object
   * @param {string} str - Query string
   * @returns {Object}
   */
  parseQueryParams(str) {
    if (!str) return {};
    const params = {};
    str.split('&').forEach(pair => {
      const [key, value] = pair.split('=');
      if (key) {
        params[decodeURIComponent(key)] = decodeURIComponent(value || '');
      }
    });
    return params;
  }

  /**
   * Match route path with params
   * @param {string} path - Current path
   * @returns {Object|null}
   */
  matchRoute(path) {
    for (const [routePath, loader] of Object.entries(routes)) {
      // Convert route pattern to regex
      const regex = new RegExp('^' + routePath.replace(/:([^/]+)/g, '([^/]+)') + '$');
      const match = path.match(regex);
      
      if (match) {
        // Extract param names and values
        const keys = routePath.match(/:([^/]+)/g)?.map(k => k.slice(1)) || [];
        const params = {};
        keys.forEach((key, i) => {
          params[key] = match[i + 1];
        });
        
        return { loader, params };
      }
    }
    return null;
  }

  /**
   * Navigate to route
   * @param {Function} loader - Page loader function
   * @param {Object} params - Route params
   * @param {string} path - Current path
   */
  async navigate(loader, params, path) {
    const mainContent = document.getElementById('main-content');
    
    // Show loading state
    if (mainContent) {
      mainContent.innerHTML = '<div class="page-transition"><div class="loading-spinner"></div></div>';
    }
    
    try {
      // Load page module
      const module = await loader();
      const Page = module.default || module;
      const page = new Page(params);
      
      // Clear content and render new page
      if (mainContent) {
        mainContent.innerHTML = '';
        mainContent.appendChild(page.render());
      }
      
      // Update active nav state
      this.updateActiveNav(path);
      
      // Store in history
      this.history.push(path);
      this.currentRoute = path;
      this.params = params;
      
      // Scroll to top
      window.scrollTo(0, 0);
      
      // Dispatch custom event for page load
      window.dispatchEvent(new CustomEvent('pageLoaded', { detail: { path, params } }));
      
    } catch (error) {
      console.error('Navigation error:', error);
      if (mainContent) {
        mainContent.innerHTML = `
          <div class="not-found">
            <div class="not-found-code">500</div>
            <h2 class="not-found-title">Error Loading Page</h2>
            <p class="not-found-text">Something went wrong. Please try again.</p>
            <button class="btn btn-primary" onclick="window.location.reload()">Reload</button>
          </div>
        `;
      }
    }
  }

  /**
   * Update active navigation link
   * @param {string} path - Current path
   */
  updateActiveNav(path) {
    // Update bottom nav
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
      const href = item.getAttribute('href');
      item.classList.toggle('active', href === `#${path}` || 
        (path === '/' && href === '#/'));
    });
    
    // Update top nav
    document.querySelectorAll('.top-nav-link').forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${path}`);
    });
    
    // Update sidebar
    document.querySelectorAll('.sidebar-link').forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${path}`);
    });
  }

  /**
   * Push new route to history
   * @param {string} path - Path to navigate to
   */
  push(path) {
    window.location.hash = path;
  }

  /**
   * Replace current route
   * @param {string} path - Path to replace with
   */
  replace(path) {
    window.history.replaceState(null, '', `#${path}`);
    this.handleRoute();
  }

  /**
   * Go back in history
   */
  back() {
    window.history.back();
  }

  /**
   * Go forward in history
   */
  forward() {
    window.history.forward();
  }

  /**
   * Get current path
   * @returns {string}
   */
  getCurrentPath() {
    return this.currentRoute;
  }

  /**
   * Get current params
   * @returns {Object}
   */
  getParams() {
    return this.params;
  }
}

export const router = new Router();
