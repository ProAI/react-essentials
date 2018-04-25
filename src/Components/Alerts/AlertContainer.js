import React from 'react';
import AlertStack from './AlertStack';
import { defaultAlert, constants } from './constants';
import { getPositionAttributes } from './helpers';
import Alert from './Alert';

const propTypes = {};

class AlertContainer extends React.Component {
  state = {
    alerts: [],
  };

  componentWillMount() {
    Alert.init(this);
  }

  stacks = [];

  uid = 3400;

  didAlertRemoved = (uid) => {
    let alert;
    const alerts = this.state.alerts.filter((toCheck) => {
      if (toCheck.uid === uid) {
        alert = toCheck;
        return false;
      }
      return true;
    });

    if (alert && alert.onRemove) {
      alert.onRemove(alert);
    }

    this.setState({ alerts });
  };

  add = (customAlert) => {
    if (
      customAlert.placement === undefined ||
      customAlert.placement === 'top center' ||
      customAlert.placement === 'top' ||
      customAlert.placement === 'bottom center' ||
      customAlert.placement === 'bottom'
    ) {
      defaultAlert.icon = true;
      defaultAlert.small = false;
    } else {
      defaultAlert.icon = false;
      defaultAlert.small = true;
    }

    const alert = {};
    Object.keys(defaultAlert).forEach((value) => {
      alert[value] = customAlert[value] === undefined ? defaultAlert[value] : customAlert[value];
    });

    if (alert.placement === 'top') {
      alert.placement = 'top center';
    }
    if (alert.placement === 'bottom') {
      alert.placement = 'bottom center';
    }

    const { alerts } = this.state;
    let id;

    if (!alert.variant) {
      throw new Error('alert variant is required.');
    }

    if (constants.variants.indexOf(alert.variant) === -1) {
      throw new Error(`"${alert.variant}" is not a valid variant.`);
    }

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(alert.autoDismiss)) {
      throw new Error('"autoDismiss" must be a number.');
    }

    if (constants.positions.indexOf(alert.placement) === -1) {
      throw new Error(`"${alert.placement}" is not a valid position.`);
    }

    // Some preparations
    alert.autoDismiss = parseInt(alert.autoDismiss, 10);

    alert.uid = alert.uid || this.uid;
    alert.ref = `alert-${alert.uid}`;
    this.uid += 1;

    // do not add if the alert already exists based on supplied uid
    for (id = 0; id < alerts.length; id += 1) {
      if (alerts[id].uid === alert.uid) {
        return false;
      }
    }

    alerts.push(alert);

    if (typeof alert.onAdd === 'function') {
      alert.onAdd(alert);
    }

    this.setState({ alerts });

    return alert;
  };

  remove = (activeAlert) => {
    const self = this;
    Object.keys(this.stacks).forEach((stack) => {
      if (stack.indexOf('stack') > -1) {
        Object.keys(self.refs[stack].refs).forEach((alert) => {
          const uid = activeAlert.uid ? activeAlert.uid : activeAlert;
          if (alert === `alert-${uid}`) {
            self.refs[stack].refs[alert].hideAlert();
          }
        });
      }
    });
  };

  render() {
    const self = this;
    let positions = null;

    if (this.state.alerts.length) {
      positions = constants.positions.map((position) => {
        const alerts = this.state.alerts.filter(alert => position === alert.placement);

        const positionAttributes = getPositionAttributes(position);

        if (alerts.length) {
          return (
            <AlertStack
              ref={(c) => {
                this.stacks[positionAttributes.className] = c;
              }}
              key={positionAttributes.className}
              position={position}
              alerts={alerts}
              onRemove={self.didAlertRemoved}
              preventAnimation={self.props.preventAnimation}
            />
          );
        }

        return null;
      });
    }

    return <div className="alert-wrapper">{positions}</div>;
  }
}

AlertContainer.propTypes = propTypes;

export default AlertContainer;
