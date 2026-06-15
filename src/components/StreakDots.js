/**
 * Streak Dots Component
 */
import { createElement } from '../utils/dom.js';

export class StreakDots {
  constructor(props = {}) {
    this.props = {
      days: [], // Array of booleans
      count: 0,
      ...props
    };
    this.element = null;
  }

  render() {
    const container = createElement('div', { className: 'streak-container' });

    // Streak count display
    const countEl = createElement('div', { className: 'streak-count' }, [
      createElement('span', { 
        className: 'text-brand',
        style: { fontSize: '24px', fontWeight: '700', fontFamily: 'var(--font-display)' }
      }, this.props.count),
      createElement('span', { 
        className: 'text-muted',
        style: { fontSize: '12px', marginLeft: '4px' }
      }, 'day streak')
    ]);
    container.appendChild(countEl);

    // Dots
    const dotsContainer = createElement('div', { className: 'streak-dots' });
    
    this.props.days.forEach((active, index) => {
      const dot = createElement('div', {
        className: `streak-dot${active ? ' active' : ' missed'}`
      });
      dotsContainer.appendChild(dot);
    });

    container.appendChild(dotsContainer);
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

/**
 * Streak Tracker Widget
 */
import { streakDays, streakCount } from '../data.js';
import { WidgetWithHeader } from './Widget.js';

export class StreakTracker extends WidgetWithHeader {
  constructor(props = {}) {
    super({
      title: 'Weekly Streak',
      ...props
    });
  }

  render() {
    const widget = super.render();
    
    const streakDots = new StreakDots({
      days: streakDays,
      count: streakCount
    });

    const content = widget.querySelector('.widget-content');
    if (content) {
      content.appendChild(streakDots.render());
    }

    return widget;
  }
}
