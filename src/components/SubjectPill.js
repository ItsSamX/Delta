/**
 * Subject Pill Component
 */
import { createElement } from '../utils/dom.js';

export class SubjectPill {
  constructor(props = {}) {
    this.props = {
      subject: '',
      size: 'md',
      ...props
    };
    this.element = null;
  }

  render() {
    const subjectClass = this.props.subject.toLowerCase();
    const pill = createElement('span', {
      className: `subject-pill ${subjectClass}`
    }, this.props.subject);

    this.element = pill;
    return pill;
  }

  destroy() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}
