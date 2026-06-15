/**
 * Empty State Component
 */
import { createElement, createIcon } from '../utils/dom.js';

export class EmptyState {
  constructor(props = {}) {
    this.props = {
      icon: 'fileText',
      title: 'No items yet',
      text: 'Get started by adding your first item.',
      actionText: null,
      onAction: null,
      ...props
    };
    this.element = null;
  }

  render() {
    const container = createElement('div', { className: 'empty-state' });

    // Icon
    const iconEl = createElement('div', { className: 'empty-state-icon' }, [
      createIcon(this.props.icon, { className: 'icon-lg' })
    ]);
    container.appendChild(iconEl);

    // Title
    const titleEl = createElement('h4', { className: 'empty-state-title' }, 
      this.props.title
    );
    container.appendChild(titleEl);

    // Text
    const textEl = createElement('p', { className: 'empty-state-text' }, 
      this.props.text
    );
    container.appendChild(textEl);

    // Action button (optional)
    if (this.props.actionText) {
      const actionBtn = createElement('button', {
        className: 'btn btn-primary',
        style: { marginTop: 'var(--space-md)' },
        onClick: this.props.onAction
      }, [
        createIcon('plus', { className: 'icon-sm' }),
        this.props.actionText
      ]);
      container.appendChild(actionBtn);
    }

    this.element = container;
    return container;
  }

  destroy() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}
