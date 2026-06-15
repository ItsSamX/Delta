/**
 * Section Header Component
 */
import { createElement, createIcon } from '../utils/dom.js';

export class SectionHeader {
  constructor(props = {}) {
    this.props = {
      title: '',
      actionText: '',
      onAction: null,
      ...props
    };
    this.element = null;
  }

  render() {
    const header = createElement('div', { className: 'section-header' });

    const title = createElement('h3', { className: 'section-title' }, this.props.title);
    header.appendChild(title);

    if (this.props.actionText) {
      const action = createElement('span', {
        className: 'section-action',
        onClick: this.props.onAction
      }, [
        this.props.actionText,
        createIcon('chevronRight', { className: 'icon-sm' })
      ]);
      header.appendChild(action);
    }

    this.element = header;
    return header;
  }

  destroy() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}
