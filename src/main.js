import { router } from './router.js';
import { appState } from './state.js';
import responsive from './utils/responsive.js';
import { userStore } from './data.js';
import { TopNav } from './layout/TopNav.js';
import { BottomNav } from './layout/BottomNav.js';

// Initialize responsive detection
responsive.init((isDesktop) => {
  appState.isDesktop = isDesktop;
  document.body.classList.toggle('desktop', isDesktop);
  document.body.classList.toggle('mobile', !isDesktop);
  
  // Update nav visibility
  const topNav = document.getElementById('top-nav');
  const bottomNav = document.getElementById('bottom-nav');
  
  if (topNav) topNav.style.display = isDesktop ? 'flex' : 'none';
  if (bottomNav) bottomNav.style.display = isDesktop ? 'none' : 'flex';
});

// Check auth state on load
function checkAuth() {
  const user = userStore.get();
  appState.isAuthenticated = !!user;
  appState.user = user;
}

// Initialize app
window.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  
  // Initialize navigation components
  const topNavEl = document.getElementById('top-nav');
  const bottomNavEl = document.getElementById('bottom-nav');
  
  if (topNavEl) {
    const topNav = new TopNav();
    topNavEl.appendChild(topNav.render());
  }
  
  if (bottomNavEl) {
    const bottomNav = new BottomNav();
    bottomNavEl.appendChild(bottomNav.render());
  }
  
  // Hide loading screen after init
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    const app = document.getElementById('app');
    
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
      loadingScreen.style.pointerEvents = 'none';
    }
    
    if (app) {
      app.style.display = 'flex';
    }
    
    setTimeout(() => {
      if (loadingScreen) loadingScreen.remove();
    }, 500);
  }, 1200);

  // Initialize router
  router.handleRoute();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.altKey && e.key === 'ArrowLeft') history.back();
  if (e.altKey && e.key === 'ArrowRight') history.forward();
});

// Service Worker registration (optional PWA)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(console.error);
  });
}
