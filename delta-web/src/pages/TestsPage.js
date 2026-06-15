/**
 * Tests Page Component
 */
import { createElement } from '../utils/dom.js';
import { router } from '../router.js';
import { tests, testHistory } from '../data.js';
import { TestCard } from '../components/TestCard.js';
import { EmptyState } from '../components/EmptyState.js';

export default class TestsPage {
  constructor(params = {}) {
    this.params = params;
    this.element = null;
    this.activeTab = 'available';
  }

  render() {
    const page = createElement('div', { className: 'page tests-page' });

    // Header
    const header = createElement('h1', { style: { marginBottom: 'var(--space-lg)' } }, 'Tests & Mock Papers');
    page.appendChild(header);

    // Tabs
    const tabs = createElement('div', { className: 'tests-tabs' }, [
      createElement('button', {
        className: `test-tab${this.activeTab === 'available' ? ' active' : ''}`,
        onClick: () => this.switchTab('available')
      }, 'Available'),
      createElement('button', {
        className: `test-tab${this.activeTab === 'history' ? ' active' : ''}`,
        onClick: () => this.switchTab('history')
      }, 'History')
    ]);
    page.appendChild(tabs);

    // Content based on active tab
    const content = createElement('div', { className: 'tests-list' });
    
    if (this.activeTab === 'available') {
      tests.forEach(test => {
        const card = new TestCard({
          test,
          onClick: () => router.push(`/test/${test.id}`)
        });
        content.appendChild(card.render());
      });
    } else {
      if (testHistory.length > 0) {
        testHistory.forEach(result => {
          const card = createElement('div', {
            className: 'test-card',
            onClick: () => router.push(`/results/${result.id}`)
          }, [
            createElement('h4', { className: 'test-card-title' }, result.title),
            createElement('div', { className: 'test-card-meta' }, [
              createElement('span', {}, result.date),
              createElement('span', {}, ' • '),
              createElement('span', { className: 'text-brand' }, `${result.score}%`)
            ])
          ]);
          content.appendChild(card);
        });
      } else {
        content.appendChild(new EmptyState({
          icon: 'fileText',
          title: 'No test history',
          text: 'Take a test to see your results here.'
        }).render());
      }
    }

    page.appendChild(content);
    this.element = page;
    return page;
  }

  switchTab(tab) {
    this.activeTab = tab;
    if (this.element) {
      this.element.remove();
      this.render();
    }
  }

  destroy() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}
