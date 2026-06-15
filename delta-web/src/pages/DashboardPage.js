/**
 * Dashboard Page Component
 */
import { createElement } from '../utils/dom.js';
import { BarChart } from '../components/BarChart.js';
import { studyHours, weekDays, heroStats } from '../data.js';

export class StudyHoursChart {
  constructor() {
    this.element = null;
  }

  render() {
    const chart = new BarChart({
      data: studyHours,
      labels: weekDays
    });
    
    this.element = chart.render();
    return this.element;
  }

  destroy() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}

export default class DashboardPage {
  constructor(params = {}) {
    this.params = params;
    this.element = null;
  }

  render() {
    const page = createElement('div', { className: 'page dashboard-page' });

    // Header
    const header = createElement('div', { className: 'dashboard-header' }, [
      createElement('p', { className: 'dashboard-welcome' }, 'Welcome back'),
      createElement('h1', { className: 'dashboard-name' }, 'Jordan Doe')
    ]);
    page.appendChild(header);

    // Stats grid
    const statsGrid = createElement('div', { className: 'dashboard-stats' }, [
      createElement('div', { className: 'stat-card' }, [
        createElement('div', { className: 'stat-value' }, `${heroStats.completion}%`),
        createElement('div', { className: 'stat-label' }, 'Completion Rate')
      ]),
      createElement('div', { className: 'stat-card' }, [
        createElement('div', { className: 'stat-value' }, heroStats.lectures),
        createElement('div', { className: 'stat-label' }, 'Lectures Watched')
      ]),
      createElement('div', { className: 'stat-card' }, [
        createElement('div', { className: 'stat-value' }, `${heroStats.hours}h`),
        createElement('div', { className: 'stat-label' }, 'Hours Studied')
      ]),
      createElement('div', { className: 'stat-card' }, [
        createElement('div', { className: 'stat-value' }, heroStats.tests),
        createElement('div', { className: 'stat-label' }, 'Tests Taken')
      ])
    ]);
    page.appendChild(statsGrid);

    // Chart section
    const chartSection = createElement('div', { className: 'widget' }, [
      createElement('h3', { style: { marginBottom: 'var(--space-md)' } }, 'Study Activity'),
      new StudyHoursChart().render()
    ]);
    page.appendChild(chartSection);

    this.element = page;
    return page;
  }

  destroy() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}
