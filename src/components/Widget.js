/**
 * Base Widget Component
 */
import { createElement, createIcon } from '../utils/dom.js';

export class Widget {
  constructor(props = {}) {
    this.props = props;
    this.element = null;
  }

  render() {
    const el = createElement('div', {
      className: 'widget',
      style: {
        animationDelay: this.props.delay || '0s'
      }
    });

    if (this.props.children) {
      if (Array.isArray(this.props.children)) {
        el.append(...this.props.children);
      } else {
        el.appendChild(this.props.children);
      }
    }

    this.element = el;
    return el;
  }

  update(newProps) {
    this.props = { ...this.props, ...newProps };
    // Re-render or patch DOM as needed
  }

  destroy() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}

/**
 * Widget with Header
 */
export class WidgetWithHeader extends Widget {
  render() {
    const widget = super.render();
    
    const header = createElement('div', { className: 'widget-header' }, [
      createElement('span', { className: 'widget-title' }, this.props.title || ''),
      this.props.action ? this.props.action : null
    ]);

    const content = createElement('div', { className: 'widget-content' });
    
    if (this.props.children) {
      if (Array.isArray(this.props.children)) {
        content.append(...this.props.children);
      } else {
        content.appendChild(this.props.children);
      }
    }

    widget.innerHTML = '';
    widget.append(header, content);
    
    return widget;
  }
}
