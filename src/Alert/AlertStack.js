import React from 'react';
import PropTypes from 'prop-types';
import AlertsItem from './AlertsItem';
import { getPositionAttributes } from './helpers';

const propTypes = {
  position: PropTypes.string.isRequired,
  alerts: PropTypes.array.isRequired,
};

class AlertStack extends React.Component {
  render() {
    const self = this;

    if (['bottom left', 'bottom right', 'bottom center'].indexOf(this.props.position) > -1) {
      this.props.alerts.reverse();
    }

    const alerts = this.props.alerts.map(alert => (
      <AlertsItem
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

AlertStack.propTypes = propTypes;

export default AlertStack;
