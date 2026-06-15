/**
 * Filter Pills Component
 */
import { createElement } from '../utils/dom.js';

export class FilterPills {
  constructor(props = {}) {
    this.props = {
      items: [],
      active: 'All',
      onChange: null,
      ...props
    };
    this.element = null;
  }

  render() {
    const container = createElement('div', { className: 'filter-pills' });

    this.props.items.forEach((item, index) => {
      const pill = createElement('button', {
        className: `filter-pill${this.props.active === item ? ' active' : ''}`,
        onClick: () => this.handleClick(item)
      }, item);

      container.appendChild(pill);
    });

    this.element = container;
    return container;
  }

  handleClick(item) {
    if (this.props.onChange) {
      this.props.onChange(item);
    }
    
    // Update active state
    const pills = this.element.querySelectorAll('.filter-pill');
    pills.forEach((pill, index) => {
      pill.classList.toggle('active', this.props.items[index] === item);
    });
  }

  setActive(active) {
    this.props.active = active;
    if (this.element) {
      const pills = this.element.querySelectorAll('.filter-pill');
      pills.forEach((pill, index) => {
        pill.classList.toggle('active', this.props.items[index] === active);
      });
    }
  }

  destroy() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}
