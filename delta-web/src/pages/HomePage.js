/**
 * Home Page Component
 */
import { createElement, createIcon } from '../utils/dom.js';
import { WidgetWithHeader } from '../components/Widget.js';
import { FilterPills } from '../components/FilterPills.js';
import { HeroMetrics } from '../components/StatCard.js';
import { ContinueWatchingCard } from '../components/LectureCard.js';
import { SectionHeader } from '../components/SectionHeader.js';
import { StudyHoursChart } from './DashboardPage.js';
import { StreakTracker } from '../components/StreakDots.js';
import { Leaderboard } from '../components/LeaderboardRow.js';
import { appState, subscribe } from '../state.js';
import { router } from '../router.js';
import { 
  subjectFilters, 
  continueWatching, 
  upNext, 
  studyHours, 
  weekDays 
} from '../data.js';

export default class HomePage {
  constructor(params = {}) {
    this.params = params;
    this.unsubscribers = [];
    this.element = null;
  }

  render() {
    const page = createElement('div', { className: 'page home-page' });

    // Hero section with metrics
    const heroSection = createElement('section', { className: 'hero-section' });
    heroSection.appendChild(new HeroMetrics().render());
    page.appendChild(heroSection);

    // Filter pills
    const filtersContainer = createElement('div', { style: { marginBottom: 'var(--space-lg)' } });
    const filterPills = new FilterPills({
      items: subjectFilters,
      active: appState.activeFilter,
      onChange: (filter) => {
        appState.activeFilter = filter;
      }
    });
    filtersContainer.appendChild(filterPills.render());
    page.appendChild(filtersContainer);

    // Content grid
    const grid = createElement('div', { className: 'home-grid' });

    // Continue Watching
    const continueWidget = new WidgetWithHeader({
      title: 'Continue Watching',
      actionText: 'See All',
      onAction: () => router.push('/classes')
    });
    const continueContent = continueWidget.querySelector('.widget-content');
    if (continueContent && continueWatching.length > 0) {
      continueWatching.slice(0, 2).forEach(lecture => {
        const card = new ContinueWatchingCard({
          lecture,
          onClick: () => router.push(`/lecture/${lecture.id}`)
        });
        continueContent.appendChild(card.render());
      });
    } else if (continueContent) {
      continueContent.innerHTML = '<p class="text-muted">No lectures in progress</p>';
    }
    grid.appendChild(continueWidget.render());

    // Up Next
    const upNextWidget = new WidgetWithHeader({
      title: 'Up Next',
      actionText: 'View All',
      onAction: () => router.push('/classes')
    });
    const upNextContent = upNextWidget.querySelector('.widget-content');
    if (upNextContent) {
      upNext.forEach(lecture => {
        const item = createElement('div', {
          className: 'lecture-card',
          style: { padding: 'var(--space-md)', marginBottom: 'var(--space-sm)' },
          onClick: () => router.push(`/lecture/${lecture.id}`)
        }, [
          createElement('h4', { className: 'lecture-card-title', style: { marginBottom: 'var(--space-xs)' }}, lecture.title),
          createElement('div', { className: 'lecture-card-meta' }, [
            createElement('span', {}, lecture.subject),
            createElement('span', {}, ' • '),
            createElement('span', {}, lecture.teacher),
            createElement('span', {}, ' • '),
            createElement('span', {}, lecture.duration)
          ])
        ]);
        upNextContent.appendChild(item);
      });
    }
    grid.appendChild(upNextWidget.render());

    // Study Hours Chart
    const chartWidget = new WidgetWithHeader({ title: 'Study Hours' });
    const chartContent = chartWidget.querySelector('.widget-content');
    if (chartContent) {
      chartContent.appendChild(new StudyHoursChart().render());
    }
    grid.appendChild(chartWidget.render());

    // Streak Tracker
    grid.appendChild(new StreakTracker().render());

    // Leaderboard
    grid.appendChild(new Leaderboard().render());

    page.appendChild(grid);

    // Subscribe to filter changes
    this.unsubscribers.push(
      subscribe('activeFilter', (newFilter) => {
        // Update content based on filter
        console.log('Filter changed to:', newFilter);
      })
    );

    this.element = page;
    return page;
  }

  destroy() {
    this.unsubscribers.forEach(unsub => unsub());
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}
