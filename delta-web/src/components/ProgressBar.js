/**
 * Progress Bar Component
 */
import { createElement } from '../utils/dom.js';

export class ProgressBar {
  constructor(props = {}) {
    this.props = {
      value: 0,
      max: 100,
      color: 'brand', // brand, success, info
      showLabel: false,
      size: 'md', // sm, md, lg
      ...props
    };
    this.element = null;
  }

  render() {
    const percentage = Math.min(100, Math.max(0, (this.props.value / this.props.max) * 100));
    
    const container = createElement('div', {
      className: `progress-bar progress-bar-${this.props.size}`
    });

    const fill = createElement('div', {
      className: `progress-bar-fill ${this.props.color !== 'brand' ? this.props.color : ''}`,
      style: { width: `${percentage}%` }
    });

    container.appendChild(fill);

    if (this.props.showLabel) {
      const label = createElement('div', {
        className: 'text-muted',
        style: { fontSize: '11px', marginTop: '4px', textAlign: 'right' }
      }, `${Math.round(percentage)}%`);
      container.appendChild(label);
    }

    this.element = container;
    return container;
  }

  setValue(value) {
    this.props.value = value;
    const percentage = Math.min(100, Math.max(0, (this.props.value / this.props.max) * 100));
    
    if (this.element) {
      const fill = this.element.querySelector('.progress-bar-fill');
      if (fill) {
        fill.style.width = `${percentage}%`;
      }
      
      if (this.props.showLabel) {
        const label = this.element.querySelector('.text-muted');
        if (label) {
          label.textContent = `${Math.round(percentage)}%`;
        }
      }
    }
  }

  destroy() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}
