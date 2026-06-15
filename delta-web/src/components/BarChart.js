/**
 * Bar Chart Component (Study Hours)
 */
import { createElement } from '../utils/dom.js';

export class BarChart {
  constructor(props = {}) {
    this.props = {
      data: [],
      labels: [],
      maxValue: null,
      ...props
    };
    this.element = null;
  }

  render() {
    const chart = createElement('div', { className: 'bar-chart' });

    const max = this.props.maxValue || Math.max(...this.props.data, 1);

    this.props.data.forEach((value, index) => {
      const percentage = (value / max) * 100;
      
      const column = createElement('div', { className: 'bar-chart-column' }, [
        createElement('div', { 
          className: 'bar-chart-bar',
          style: { '--bar-height': `${percentage}%` }
        }),
        createElement('span', { className: 'bar-chart-label' }, 
          this.props.labels[index] || ''
        )
      ]);

      chart.appendChild(column);
    });

    this.element = chart;
    return chart;
  }

  update(data, labels) {
    this.props.data = data;
    if (labels) this.props.labels = labels;
    
    if (this.element) {
      this.element.innerHTML = '';
      this.render().querySelectorAll('.bar-chart-column').forEach(col => {
        this.element.appendChild(col);
      });
    }
  }

  destroy() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}
