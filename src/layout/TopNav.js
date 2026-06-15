/**
 * Top Navigation Component (Desktop)
 */
import { createElement, createIcon } from '../utils/dom.js';
import { router } from '../router.js';
import { userStore } from '../utils/storage.js';

export class TopNav {
  constructor() {
    this.element = null;
    this.items = [
      { path: '/', label: 'Home' },
      { path: '/classes', label: 'Classes' },
      { path: '/tests', label: 'Tests' },
      { path: '/notes', label: 'Notes' }
    ];
  }

  render() {
    const nav = createElement('nav', { className: 'top-nav' });
    
    // Brand
    const brand = createElement('a', { 
      className: 'top-nav-brand',
      href: '#/',
      onClick: (e) => { e.preventDefault(); router.push('/'); }
    }, [
      createElement('span', { className: 'top-nav-logo' }, 'Δ'),
      'Delta'
    ]);
    nav.appendChild(brand);
    
    // Links
    const links = createElement('div', { className: 'top-nav-links' });
    this.items.forEach(item => {
      const link = createElement('a', {
        className: 'top-nav-link',
        href: `#${item.path}`,
        onClick: (e) => {
          e.preventDefault();
          router.push(item.path);
        }
      }, item.label);
      links.appendChild(link);
    });
    nav.appendChild(links);
    
    // Actions
    const actions = createElement('div', { className: 'top-nav-actions' });
    
    // Search trigger
    const searchBtn = createElement('button', {
      className: 'btn-icon',
      onClick: () => router.push('/search')
    }, [
      createIcon('search')
    ]);
    actions.appendChild(searchBtn);
    
    // Notifications
    const notifBtn = createElement('button', {
      className: 'btn-icon',
      onClick: () => router.push('/notifications')
    }, [
      createIcon('bell')
    ]);
    actions.appendChild(notifBtn);
    
    // Profile
    const user = userStore.get();
    if (user) {
      const profileBtn = createElement('button', {
        className: 'btn-icon',
        onClick: () => router.push('/profile')
      }, [
        createElement('div', {
          className: 'leaderboard-avatar',
          style: { width: '32px', height: '32px', fontSize: '12px' }
        }, user.name?.charAt(0) || 'U')
      ]);
      actions.appendChild(profileBtn);
    } else {
      const loginBtn = createElement('button', {
        className: 'btn btn-primary',
        onClick: () => router.push('/login')
      }, 'Sign In');
      actions.appendChild(loginBtn);
    }
    
    nav.appendChild(actions);
    this.element = nav;
    return nav;
  }

  setActive(path) {
    if (!this.element) return;
    
    this.items.forEach((item, index) => {
      const link = this.element.querySelectorAll('.top-nav-link')[index];
      if (link) {
        link.classList.toggle('active', item.path === path);
      }
    });
  }

  destroy() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}
