class Notification {
  constructor(copy) {
    this.copy      = copy || '';
    this.baseClass = 'notification';
  }

  create() {
    const p = document.createElement('p'),
          t = document.createTextNode(this.copy);
    p.appendChild(t);
    p.classList.add(this.baseClass);
    return p;
  }
};

export default Notification;
