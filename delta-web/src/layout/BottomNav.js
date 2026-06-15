/**
 * Bottom Navigation Component (Mobile)
 */
import { createElement, createIcon } from '../utils/dom.js';
import { router } from '../router.js';

export class BottomNav {
  constructor() {
    this.element = null;
    this.items = [
      { path: '/', icon: 'home', label: 'Home' },
      { path: '/classes', icon: 'book', label: 'Classes' },
      { path: '/tests', icon: 'fileText', label: 'Tests' },
      { path: '/notes', icon: 'pieChart', label: 'Notes' },
      { path: '/profile', icon: 'user', label: 'Profile' }
    ];
  }

  render() {
    const nav = createElement('nav', { className: 'bottom-nav' });
    
    const list = createElement('ul', { className: 'bottom-nav-list' });
    
    this.items.forEach(item => {
      const li = createElement('li');
      
      const navItem = createElement('div', {
        className: 'bottom-nav-item',
        href: `#${item.path}`,
        onClick: (e) => {
          e.preventDefault();
          router.push(item.path);
        }
      }, [
        createIcon(item.icon, { className: 'bottom-nav-icon' }),
        createElement('span', {}, item.label)
      ]);
      
      li.appendChild(navItem);
      list.appendChild(li);
    });
    
    nav.appendChild(list);
    this.element = nav;
    return nav;
  }

  setActive(path) {
    if (!this.element) return;
    
    this.items.forEach((item, index) => {
      const navItem = this.element.querySelectorAll('.bottom-nav-item')[index];
      if (navItem) {
        navItem.classList.toggle('active', item.path === path || 
          (path === '/' && item.path === '/'));
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
