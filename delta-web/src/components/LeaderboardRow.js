/**
 * Leaderboard Row Component
 */
import { createElement } from '../utils/dom.js';

export class LeaderboardRow {
  constructor(props = {}) {
    this.props = {
      rank: 0,
      name: '',
      score: '',
      avatar: '',
      ...props
    };
    this.element = null;
  }

  render() {
    const row = createElement('div', { className: 'leaderboard-row' });

    // Rank badge
    let rankClass = '';
    if (this.props.rank === 1) rankClass = 'top-1';
    else if (this.props.rank === 2) rankClass = 'top-2';
    else if (this.props.rank === 3) rankClass = 'top-3';

    const rankEl = createElement('div', {
      className: `leaderboard-rank ${rankClass}`
    }, this.props.rank);
    row.appendChild(rankEl);

    // Avatar
    const avatarEl = createElement('div', { className: 'leaderboard-avatar' }, 
      this.props.avatar || this.props.name.charAt(0) + this.props.name.split(' ')[1]?.charAt(0) || '?'
    );
    row.appendChild(avatarEl);

    // Info
    const infoEl = createElement('div', { className: 'leaderboard-info' }, [
      createElement('div', { className: 'leaderboard-name' }, this.props.name),
      createElement('div', { className: 'leaderboard-score' }, `${this.props.score} points`)
    ]);
    row.appendChild(infoEl);

    // Points (highlighted)
    const pointsEl = createElement('div', { className: 'leaderboard-points' }, 
      this.props.score
    );
    row.appendChild(pointsEl);

    this.element = row;
    return row;
  }

  destroy() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}

/**
 * Leaderboard Widget
 */
import { leaderboard } from '../data.js';
import { WidgetWithHeader } from './Widget.js';

export class Leaderboard extends WidgetWithHeader {
  constructor(props = {}) {
    super({
      title: 'Leaderboard',
      actionText: 'View All',
      onAction: () => console.log('View all leaderboard'),
      ...props
    });
  }

  render() {
    const widget = super.render();
    
    const content = widget.querySelector('.widget-content');
    if (content) {
      // Show top 5
      leaderboard.slice(0, 5).forEach(entry => {
        const row = new LeaderboardRow(entry);
        content.appendChild(row.render());
      });
    }

    return widget;
  }
}
