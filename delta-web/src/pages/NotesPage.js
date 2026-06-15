import { Page } from './Page.js';
import { createElement } from '../utils/dom.js';
import { notesStore, seedNotes } from '../data.js';
import { NoteCard } from '../components/NoteCard.js';
import { SectionHeader } from '../components/SectionHeader.js';
import { EmptyState } from '../components/EmptyState.js';
import { router } from '../router.js';

export class NotesPage extends Page {
  constructor(params = {}) {
    super();
    this.params = params;
    this.notes = [];
  }

  loadNotes() {
    const stored = notesStore.getAll();
    this.notes = stored.length > 0 ? stored : seedNotes;
  }

  render() {
    this.loadNotes();
    
    const container = createElement('div', { className: 'page notes-page' });
    
    // Header
    const header = createElement('div', { className: 'page-header' });
    header.innerHTML = `
      <h1>My Notes</h1>
      <p class="page-subtitle">Organize your study notes</p>
    `;
    container.appendChild(header);
    
    // Add note button
    const addButton = createElement('button', { 
      className: 'btn btn-primary',
      onClick: () => this.showAddNoteModal()
    }, '+ Add Note');
    header.appendChild(addButton);
    
    // Notes grid
    const notesGrid = createElement('div', { className: 'notes-grid' });
    
    if (this.notes.length === 0) {
      const empty = new EmptyState({
        icon: 'file-text',
        title: 'No notes yet',
        description: 'Create your first note to get started',
        action: { label: 'Create Note', onClick: () => this.showAddNoteModal() }
      });
      notesGrid.appendChild(empty.render());
    } else {
      this.notes.forEach(note => {
        const card = new NoteCard({
          ...note,
          onDelete: (id) => this.deleteNote(id)
        });
        notesGrid.appendChild(card.render());
      });
    }
    
    container.appendChild(notesGrid);
    return container;
  }
  
  showAddNoteModal() {
    // Simple prompt for now - could be enhanced with a modal
    const title = prompt('Note title:');
    if (!title) return;
    
    const content = prompt('Note content:');
    if (!content) return;
    
    const subject = prompt('Subject (Physics/Chemistry/Maths):') || 'General';
    
    notesStore.add({ title, content, subject });
    this.refresh();
  }
  
  deleteNote(id) {
    if (confirm('Delete this note?')) {
      notesStore.delete(id);
      this.refresh();
    }
  }
  
  refresh() {
    // Re-render the page
    const main = document.getElementById('main-content');
    if (main) {
      main.innerHTML = '';
      main.appendChild(this.render());
    }
  }
}

export default NotesPage;
