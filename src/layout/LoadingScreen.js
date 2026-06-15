/**
 * Loading Screen Component
 */
import { createElement } from '../utils/dom.js';

export class LoadingScreen {
  constructor(props = {}) {
    this.props = {
      message: 'Loading your journey...',
      ...props
    };
    this.element = null;
  }

  render() {
    const screen = createElement('div', { 
      id: 'loading-screen',
      className: 'loading-screen'
    });

    const content = createElement('div', { className: 'loading-content' }, [
      createElement('div', { className: 'loading-logo' }, 'Δ'),
      createElement('div', { className: 'loading-text' }, 'Delta'),
      createElement('div', { className: 'loading-spinner' }),
      createElement('div', { className: 'loading-status' }, this.props.message),
      createElement('div', { className: 'loading-progress' }, [
        createElement('div', { className: 'loading-progress-bar' })
      ])
    ]);

    screen.appendChild(content);
    this.element = screen;
    return screen;
  }

  hide() {
    if (this.element) {
      this.element.style.opacity = '0';
      setTimeout(() => {
        this.element.remove();
        this.element = null;
      }, 500);
    }
  }

  destroy() {
    this.hide();
  }
}
