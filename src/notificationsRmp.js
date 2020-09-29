import Notification from './Notification.js';

const notifications = (function() {

  let _options = {
    classRemoving : 'notification--removing',
    classVisible  : 'notification--visible',
    delayFadeIn   : 2000,
    delayFadeOut  : 1000,
    id            : 'notification-container'
  };
  let notificationContainer = null;
  let timerIndex = null;
  const timers = [];

  /**
   * Initialize the module
   *
   * @param {Object} options the configurable options
   */
  function init(options = {}) {
    _options = {
      ..._options,
      ...options
    };

    try {
      notificationContainer = document.getElementById(_options.id);
      if (!notificationContainer) {
        throw 'Invalid notificationContainer ID.';
      }
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Render the notification
   *
   * @param {String} copy the notification copy
   */
  function render(copy) {
    const n = new Notification(copy).create();

    notificationContainer.appendChild(n);

    // @NOTE requestAnimationFrame to allow initial paint
    window.requestAnimationFrame(() => {
      n.classList.add(_options.classVisible);

      setRemoveTimer(n, removeNotification);
    });
  }

  /**
   * Set the timer index
   *
   * @return {Number} the timer index
   */
  function setTimerIndex() {
    timerIndex = (timerIndex === null) ? 0 : timerIndex += 1;
    return timerIndex;
  }

  /**
   * Set the timer to remove the notification
   *
   * @param {Element} el the notification element
   * @param {Function} callback a callback function
   */
  function setRemoveTimer(el, callback) {
    const _index = setTimerIndex();

    timers[_index] = window.setTimeout(() => setRemoveTimerCb(), _options.delayFadeIn);

    function setRemoveTimerCb() {
      // fade the element
      el.classList.remove(_options.classVisible)
      el.classList.add(_options.classRemoving);

      // remove the element
      if (typeof callback != 'undefined' && callback) {
        callback(el);
      }

      window.clearTimeout(timers[_index]);
    }
  }

  /**
   * Remove the notification element after the specified time
   *
   * @param {Element} el the notification element
   */
  function removeNotification(el) {
    const _index = setTimerIndex();

    timers[_index] = window.setTimeout(() => removeNotificationCb(), _options.delayFadeOut);

    function removeNotificationCb() {
      el.remove();
      el = null; // garbage collection
      window.clearTimeout(timers[_index]);
    }
  }

  return {
    init,
    render
  };

})();
