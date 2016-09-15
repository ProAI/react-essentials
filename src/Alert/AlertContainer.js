import React, { Component, PropTypes } from 'react';
import AlertItem from './AlertItem';
import { getPositionAttributes } from './helpers';

const propTypes = {
  position: PropTypes.string.isRequired,
  alerts: PropTypes.array.isRequired,
};

class AlertContainer extends Component {
  render() {
    const self = this;

    if (['bottom left', 'bottom right', 'bottom center'].indexOf(this.props.position) > -1) {
      this.props.alerts.reverse();
    }

    const alerts = this.props.alerts.map(alert => (
      <AlertItem
        ref={`alert-${alert.uid}`}
        key={alert.uid}
        alert={alert}
        onRemove={self.props.onRemove}
        preventAnimation={self.props.preventAnimation}
      />
    ));

    const positionAttributes = getPositionAttributes(this.props.position);

    return (
      <div className={`alert-container alert-${positionAttributes.className}`}>
        {alerts}
      </div>
    );
  }
}

AlertContainer.propTypes = propTypes;

export default AlertContainer;
