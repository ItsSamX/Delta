import { Page } from './Page.js';

export class SearchPage extends Page {
  constructor(params = {}) {
    super();
    this.params = params;
    this.query = '';
    this.results = [];
  }

  render() {
    const container = document.createElement('div');
    container.className = 'page search-page';
    
    const header = document.createElement('div');
    header.className = 'page-header';
    header.innerHTML = `
      <h1>Search</h1>
      <p class="page-subtitle">Find lectures, tests, and notes</p>
    `;
    container.appendChild(header);
    
    const searchForm = document.createElement('form');
    searchForm.className = 'search-form';
    searchForm.innerHTML = `
      <div class="search-input-wrapper">
        <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input type="text" class="search-input" placeholder="Search for topics, lectures, tests..." />
      </div>
    `;
    container.appendChild(searchForm);
    
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results';
    resultsContainer.innerHTML = `
      <div class="search-placeholder">
        <svg class="placeholder-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <p>Start typing to search</p>
      </div>
    `;
    container.appendChild(resultsContainer);
    
    // Search handler
    const input = searchForm.querySelector('.search-input');
    input.addEventListener('input', (e) => {
      this.query = e.target.value.trim();
      if (this.query.length > 2) {
        this.performSearch(this.query);
      } else {
        resultsContainer.innerHTML = `
          <div class="search-placeholder">
            <svg class="placeholder-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <p>Start typing to search</p>
          </div>
        `;
      }
    });
    
    return container;
  }
  
  performSearch(query) {
    const resultsContainer = document.querySelector('.search-results');
    // Mock search results
    this.results = [
      { type: 'lecture', title: 'Electrostatics - Coulomb\'s Law', subject: 'Physics' },
      { type: 'test', title: 'Physics Mock Test 1', subject: 'Physics' },
      { type: 'lecture', title: 'Organic Chemistry Basics', subject: 'Chemistry' },
    ].filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
    
    if (this.results.length === 0) {
      resultsContainer.innerHTML = `
        <div class="search-placeholder">
          <p>No results found for "${query}"</p>
        </div>
      `;
      return;
    }
    
    resultsContainer.innerHTML = `
      <div class="search-results-header">${this.results.length} result${this.results.length !== 1 ? 's' : ''}</div>
    `;
    
    this.results.forEach(result => {
      const item = document.createElement('div');
      item.className = 'search-result-item';
      item.innerHTML = `
        <span class="result-type ${result.type}">${result.type}</span>
        <span class="result-title">${result.title}</span>
        <span class="result-subject">${result.subject}</span>
      `;
      resultsContainer.appendChild(item);
    });
  }
}

export default SearchPage;
