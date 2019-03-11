import AlertContainer from './AlertContainer';

class Alert {
  container = null;

  init = ref => {
    this.container = ref;
  };

  add = alert => {
    this.container.add(alert);
  };

  remove = alert => {
    this.container.remove(alert);
  };

  Container = AlertContainer;
}

// singleton
const AlertInstance = new Alert();

export default AlertInstance;
