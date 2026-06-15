/**
 * Base Page Component
 * All pages should extend this class
 */
export class Page {
  constructor(params = {}) {
    this.params = params;
    this.element = null;
  }

  /**
   * Render the page
   * @returns {HTMLElement}
   */
  render() {
    throw new Error('Page.render() must be implemented by subclass');
  }

  /**
   * Called when page is mounted
   */
  onMount() {
    // Override in subclass
  }

  /**
   * Called when page is unmounted
   */
  onUnmount() {
    // Override in subclass
    // Clean up event listeners, subscriptions, etc.
  }

  /**
   * Update page with new params
   * @param {Object} newParams 
   */
  update(newParams) {
    this.params = { ...this.params, ...newParams };
    if (this.element) {
      this.element.innerHTML = '';
      this.element.appendChild(this.render());
    }
  }

  /**
   * Destroy the page
   */
  destroy() {
    this.onUnmount();
    this.element?.remove();
    this.element = null;
  }
}

export default Page;
