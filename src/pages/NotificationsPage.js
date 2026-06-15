import { Page } from './Page.js';

export class NotificationsPage extends Page {
  constructor(params = {}) {
    super();
    this.params = params;
    this.notifications = [
      { id: 1, title: 'New lecture available', message: 'Electrostatics Part 2 is now live', time: '2h ago', unread: true },
      { id: 2, title: 'Test reminder', message: 'Physics mock test tomorrow at 10 AM', time: '5h ago', unread: true },
      { id: 3, title: 'Streak milestone', message: 'You\'ve reached a 12-day streak!', time: '1d ago', unread: false },
      { id: 4, title: 'New material', message: 'Chemistry notes updated', time: '2d ago', unread: false },
    ];
  }

  render() {
    const container = document.createElement('div');
    container.className = 'page notifications-page';
    
    const header = document.createElement('div');
    header.className = 'page-header';
    header.innerHTML = `
      <h1>Notifications</h1>
      <button class="btn btn-text" onclick="document.querySelectorAll('.notification').forEach(n => n.classList.remove('unread'))">Mark all read</button>
    `;
    container.appendChild(header);
    
    const list = document.createElement('div');
    list.className = 'notifications-list';
    
    this.notifications.forEach(notif => {
      const item = document.createElement('div');
      item.className = `notification ${notif.unread ? 'unread' : ''}`;
      item.innerHTML = `
        <div class="notification-content">
          <div class="notification-title">${notif.title}</div>
          <div class="notification-message">${notif.message}</div>
          <div class="notification-time">${notif.time}</div>
        </div>
      `;
      list.appendChild(item);
    });
    
    container.appendChild(list);
    return container;
  }
}

export default NotificationsPage;
