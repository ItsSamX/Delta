/**
 * Lecture Card Component
 */
import { createElement, createIcon } from '../utils/dom.js';
import { formatDuration } from '../utils/format.js';

export class LectureCard {
  constructor(props = {}) {
    this.props = {
      lecture: null,
      onClick: null,
      ...props
    };
    this.element = null;
  }

  render() {
    const { lecture } = this.props;
    if (!lecture) return null;

    const card = createElement('div', {
      className: 'lecture-card',
      onClick: () => this.handleClick()
    });

    // Thumbnail with play button
    const thumbnail = createElement('div', { className: 'lecture-card-thumbnail' }, [
      createElement('div', { className: 'lecture-card-play' }, [
        createIcon('play')
      ])
    ]);

    // Content
    const content = createElement('div', { className: 'lecture-card-content' }, [
      createElement('h4', { className: 'lecture-card-title' }, lecture.title),
      createElement('div', { className: 'lecture-card-meta' }, [
        createElement('span', {}, lecture.subject),
        createElement('span', {}, '•'),
        createElement('span', {}, lecture.teacher),
        createElement('span', {}, '•'),
        createElement('span', {}, formatDuration(lecture.duration))
      ])
    ]);

    // Progress bar if has progress
    if (lecture.progress > 0) {
      const progressContainer = createElement('div', { className: 'lecture-card-progress' }, [
        createElement('div', { className: 'progress-bar' }, [
          createElement('div', {
            className: 'progress-bar-fill',
            style: { width: `${lecture.progress}%` }
          })
        ]),
        createElement('div', { 
          className: 'text-muted',
          style: { fontSize: '11px', marginTop: '4px' }
        }, `${lecture.progress}% complete`)
      ]);
      content.appendChild(progressContainer);
    }

    card.append(thumbnail, content);
    this.element = card;
    return card;
  }

  handleClick() {
    if (this.props.onClick) {
      this.props.onClick(this.props.lecture);
    }
  }

  destroy() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}

/**
 * Continue Watching Card (compact version)
 */
export class ContinueWatchingCard {
  constructor(props = {}) {
    this.props = {
      lecture: null,
      onClick: null,
      ...props
    };
    this.element = null;
  }

  render() {
    const { lecture } = this.props;
    if (!lecture) return null;

    const card = createElement('div', {
      className: 'lecture-card',
      onClick: () => this.handleClick()
    });

    // Thumbnail with play button
    const thumbnail = createElement('div', { className: 'lecture-card-thumbnail' }, [
      createElement('div', { className: 'lecture-card-play' }, [
        createIcon('play')
      ])
    ]);

    // Content
    const content = createElement('div', { className: 'lecture-card-content' }, [
      createElement('h4', { className: 'lecture-card-title' }, lecture.title),
      createElement('div', { className: 'lecture-card-meta' }, [
        createElement('span', {}, lecture.subject),
        createElement('span', {}, '•'),
        createElement('span', {}, formatDuration(lecture.duration))
      ]),
      createElement('div', { className: 'lecture-card-progress' }, [
        createElement('div', { className: 'progress-bar' }, [
          createElement('div', {
            className: 'progress-bar-fill',
            style: { width: `${lecture.progress}%` }
          })
        ])
      ])
    ]);

    card.append(thumbnail, content);
    this.element = card;
    return card;
  }

  handleClick() {
    if (this.props.onClick) {
      this.props.onClick(this.props.lecture);
    }
  }

  destroy() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}
