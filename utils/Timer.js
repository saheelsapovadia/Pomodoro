export default class Timer {
  MODE;
  currentMode;
  constructor() {
    this.MODE = new Map([
      ['pomodoro', 1500],
      ['rest', 30],
      ['lrest', 900],
    ]);
    this.currentMode = 'pomodoro';
  }

  getMode() {
    return this.currentMode;
  }

  setMode(mode, callback) {
    this.currentMode = mode;
    callback();
  }

  getTime() {
    return this.MODE.get(this.currentMode);
  }
}
