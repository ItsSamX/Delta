/**
 * Stat Card Component
 */
import { createElement, createIcon } from '../utils/dom.js';

export class StatCard {
  constructor(props = {}) {
    this.props = {
      value: '',
      label: '',
      change: null,
      icon: null,
      ...props
    };
    this.element = null;
  }

  render() {
    const card = createElement('div', { className: 'stat-card' });

    // Value
    const value = createElement('div', { className: 'stat-value' }, this.props.value);
    card.appendChild(value);

    // Label
    const label = createElement('div', { className: 'stat-label' }, this.props.label);
    card.appendChild(label);

    // Change indicator (optional)
    if (this.props.change !== null && this.props.change !== undefined) {
      const isPositive = this.props.change >= 0;
      const changeEl = createElement('div', {
        className: `stat-change ${isPositive ? 'positive' : 'negative'}`
      }, [
        createIcon(isPositive ? 'trendingUp' : 'trendingDown', { className: 'icon-sm' }),
        `${Math.abs(this.props.change)}%`
      ]);
      card.appendChild(changeEl);
    }

    this.element = card;
    return card;
  }

  destroy() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}

/**
 * Hero Metrics Grid Component
 */
import { heroStats } from '../data.js';

export class HeroMetrics {
  constructor(props = {}) {
    this.props = props;
    this.element = null;
  }

  render() {
    const container = createElement('div', { className: 'hero-metrics' });

    const stats = [
      { value: `${heroStats.completion}%`, label: 'Completion Rate', change: 12 },
      { value: heroStats.lectures, label: 'Lectures Watched', change: 8 },
      { value: `${heroStats.hours}h`, label: 'Hours Studied', change: 15 },
      { value: heroStats.tests, label: 'Tests Taken', change: -3 }
    ];

    stats.forEach(stat => {
      const statCard = new StatCard(stat);
      container.appendChild(statCard.render());
    });

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
