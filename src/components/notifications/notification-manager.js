/**
 * Centralized notification manager.
 * Manages multiple notifications in a scrollable list and syncs with the notifications toggle.
 */
class NotificationManager {
  constructor() {
    this.notifications = new Map(); // Map<id, notificationElement>
    this.toggle = null;
    this.container = null;
  }

  /**
   * Set the notifications toggle component and create the list container
   * @param {HTMLElement} toggleComponent - The toggle component
   */
  setToggle(toggleComponent) {
    this.toggle = toggleComponent;
    // Wire up the toggle to use this manager for default behavior
    if (this.toggle.setManager) {
      this.toggle.setManager(this);
    }
    this.createContainer();
    this.updateToggle();
  }

  /**
   * Create the notifications list container
   * @private
   */
  createContainer() {
    if (this.container) return;

    this.container = document.createElement('div');
    this.container.className = 'notifications-list-container';
    this.container.style.display = 'none'; // Start hidden
    document.body.appendChild(this.container);
  }

  /**
   * Show the notifications list
   */
  showList() {
    if (this.container) {
      this.container.style.display = 'flex';
    }
  }

  /**
   * Hide the notifications list
   */
  hideList() {
    if (this.container) {
      this.container.style.display = 'none';
    }
  }

  /**
   * Toggle the notifications list visibility
   */
  toggleList() {
    if (!this.container) return;

    if (this.container.style.display === 'none') {
      this.showList();
    } else {
      this.hideList();
    }
  }

  /**
   * Check if list is visible
   * @returns {boolean}
   */
  isListVisible() {
    return this.container && this.container.style.display !== 'none';
  }

  /**
   * Add a notification to the manager (prepends to list)
   * @param {string} id - Unique identifier for the notification
   * @param {HTMLElement} notificationElement - The notification component
   */
  add(id, notificationElement) {
    // If notification already exists, remove the old one first
    if (this.notifications.has(id)) {
      this.remove(id);
    }

    // Ensure container exists
    if (!this.container) {
      this.createContainer();
    }

    // Remove from body if it was added there
    if (notificationElement.parentElement === document.body) {
      notificationElement.remove();
    }

    // Prepend to container (newest first)
    this.container.prepend(notificationElement);

    this.notifications.set(id, notificationElement);
    this.updateToggle();

    // Auto-cleanup when notification is disposed
    if (!notificationElement._originalDispose) {
      notificationElement._originalDispose = notificationElement.dispose;
    }
    const originalDispose = notificationElement._originalDispose;
    notificationElement.dispose = () => {
      // Call original dispose first to clean up resources
      if (originalDispose) {
        originalDispose.call(notificationElement);
      }
      if (notificationElement.parentElement) {
        notificationElement.remove();
      }
      this.notifications.delete(id);
      this.updateToggle();
      // Restore original dispose after cleanup
      notificationElement.dispose = originalDispose;
      delete notificationElement._originalDispose;
    };
  }

  /**
   * Remove a notification from the manager
   * @param {string} id - Notification identifier
   */
  remove(id) {
    const notification = this.notifications.get(id);
    if (notification) {
      // Only dispose if it hasn't been disposed already
      if (notification.dispose) notification.dispose();
      this.notifications.delete(id);
      this.updateToggle();
    }
  }

  /**
   * Get count of active notifications
   * @returns {number}
   */
  getCount() {
    return this.notifications.size;
  }

  /**
   * Check if a notification exists
   * @param {string} id - Notification identifier
   * @returns {boolean}
   */
  has(id) {
    return this.notifications.has(id);
  }

  /**
   * Clear all notifications
   */
  clear() {
    this.notifications.forEach((notification) => {
      if (notification.dispose) notification.dispose();
    });
    this.notifications.clear();
    this.updateToggle();
  }

  /**
   * Update the toggle badge count
   * @private
   */
  updateToggle() {
    if (this.toggle) {
      this.toggle.setUnread(this.getCount());
    }
  }
}

// Export singleton instance
export const notificationManager = new NotificationManager();
