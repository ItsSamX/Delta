/**
 * Classes Page Component
 */
import { createElement, createIcon } from '../utils/dom.js';
import { router } from '../router.js';
import { classes } from '../data.js';
import { ProgressBar } from '../components/ProgressBar.js';

export default class ClassesPage {
  constructor(params = {}) {
    this.params = params;
    this.element = null;
  }

  render() {
    const page = createElement('div', { className: 'page classes-page' });

    // Header
    const header = createElement('h1', { style: { marginBottom: 'var(--space-lg)' } }, 'My Classes');
    page.appendChild(header);

    // Classes grid
    const grid = createElement('div', { className: 'classes-grid' });

    classes.forEach(cls => {
      const progress = Math.round((cls.completedLectures / cls.totalLectures) * 100);
      
      const card = createElement('div', {
        className: 'class-card',
        onClick: () => router.push(`/lecture/${cls.id}`)
      }, [
        createElement('div', { className: 'class-card-header' }, [
          createElement('div', { className: `class-card-icon ${cls.icon}` }, 
            createIcon('book')
          ),
          createElement('div', {}, [
            createElement('h3', { className: 'class-card-title' }, cls.name),
            createElement('p', { className: 'class-card-teacher' }, cls.teacher)
          ])
        ]),
        createElement('div', { className: 'class-card-progress' }, [
          new ProgressBar({ value: progress, showLabel: true }).render()
        ]),
        createElement('div', { className: 'class-card-stats' }, [
          createElement('span', {}, `${cls.completedLectures}/${cls.totalLectures} lectures`),
          createElement('span', {}, cls.nextClass)
        ])
      ]);

      grid.appendChild(card);
    });

    page.appendChild(grid);
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
