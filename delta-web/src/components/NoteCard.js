/**
 * Note Card Component
 */
import { createElement, createIcon } from '../utils/dom.js';

export class NoteCard {
  constructor(props = {}) {
    this.props = {
      note: null,
      onClick: null,
      onDelete: null,
      ...props
    };
    this.element = null;
  }

  render() {
    const { note } = this.props;
    if (!note) return null;

    const card = createElement('div', {
      className: 'note-card',
      onClick: () => this.handleClick()
    });

    // Title
    const title = createElement('h4', { className: 'note-card-title' }, note.title);
    card.appendChild(title);

    // Preview
    const preview = createElement('p', { className: 'note-card-preview' }, note.preview);
    card.appendChild(preview);

    // Footer with date and actions
    const footer = createElement('div', { className: 'note-card-footer' }, [
      createElement('span', {}, note.date),
      createElement('button', {
        className: 'btn-icon',
        onClick: (e) => {
          e.stopPropagation();
          this.handleDelete();
        }
      }, [
        createIcon('trash', { className: 'icon-sm' })
      ])
    ]);
    card.appendChild(footer);

    this.element = card;
    return card;
  }

  handleClick() {
    if (this.props.onClick) {
      this.props.onClick(this.props.note);
    }
  }

  handleDelete() {
    if (this.props.onDelete) {
      this.props.onDelete(this.props.note);
    }
  }

  destroy() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}
