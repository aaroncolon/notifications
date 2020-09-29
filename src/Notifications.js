import Notification from './Notification.js';

class Notifications {

  /**
   * Initialize the module
   *
   * @param {Object} options the configurable options
   */
  constructor(options = {}) {
    this.options = {
      classRemoving : 'notification--removing',
      classVisible  : 'notification--visible',
      delayFadeIn   : 2000,
      delayFadeOut  : 1000,
      id            : 'notification-container',
      ...options
    };
    this.notificationContainer = document.getElementById(this.options.id);
    this.timers = [];
    this.timerIndex = null;
  }

  /**
   * Render the notification
   *
   * @param {String} copy the notification copy
   */
  render(copy) {
    const n = new Notification(copy).create();

    this.notificationContainer.appendChild(n);

    // @NOTE requestAnimationFrame to allow initial paint
    window.requestAnimationFrame(() => {
      n.classList.add(this.options.classVisible);

      this.setRemoveTimer(n, this.removeNotification);
    });
  }

  /**
   * Set the timer index
   *
   * @return {Number} the timer index
   */
  setTimerIndex() {
    this.timerIndex = (this.timerIndex === null) ? 0 : this.timerIndex += 1;
    return this.timerIndex;
  }

  /**
   * Set the timer to remove the notification
   *
   * @param {Element} el the notification element
   * @param {Function} callback a callback function
   */
  setRemoveTimer(el, callback) {
    const _index = this.setTimerIndex();

    this.timers[_index] = window.setTimeout(() => setRemoveTimerCb(this), this.options.delayFadeIn);

    function setRemoveTimerCb(_this) {
      el.classList.remove(_this.options.classVisible)
      el.classList.add(_this.options.classRemoving);

      // remove the element
      if (typeof callback != 'undefined' && callback) {
        // call() with context of _this
        callback.call(_this, el);
      }

      window.clearTimeout(_this.timers[_index]);
    }
  }

  /**
   * Remove the notification element after the specified time
   *
   * @param {Element} el the notification element
   */
  removeNotification(el) {
    const _index = this.setTimerIndex();

    this.timers[_index] = window.setTimeout(() => removeNotificationCb(this), this.options.delayFadeOut);

    function removeNotificationCb(_this) {
      el.remove();
      el = null; // garbage collection
      window.clearTimeout(_this.timers[_index]);
    }
  }

};

export default Notifications;
