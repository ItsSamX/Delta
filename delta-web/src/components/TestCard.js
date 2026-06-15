/**
 * Test Card Component
 */
import { createElement } from '../utils/dom.js';

export class TestCard {
  constructor(props = {}) {
    this.props = {
      test: null,
      onClick: null,
      ...props
    };
    this.element = null;
  }

  render() {
    const { test } = this.props;
    if (!test) return null;

    const card = createElement('div', {
      className: 'test-card',
      onClick: () => this.handleClick()
    });

    // Header with badge
    const header = createElement('div', { className: 'test-card-header' }, [
      createElement('span', { 
        className: `test-card-badge ${test.difficulty}` 
      }, test.difficulty),
      createElement('span', { className: 'text-muted', style: { fontSize: '12px' } }, 
        `${test.questions} questions`
      )
    ]);
    card.appendChild(header);

    // Title
    const title = createElement('h4', { className: 'test-card-title' }, test.title);
    card.appendChild(title);

    // Meta
    const meta = createElement('div', { className: 'test-card-meta' }, [
      createElement('span', {}, `${test.duration} min`),
      createElement('span', {}, '•'),
      createElement('span', {}, `${test.attempts} attempts`),
      createElement('span', {}, '•'),
      createElement('span', {}, `Avg: ${test.avgScore}%`)
    ]);
    card.appendChild(meta);

    this.element = card;
    return card;
  }

  handleClick() {
    if (this.props.onClick) {
      this.props.onClick(this.props.test);
    }
  }

  destroy() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}
