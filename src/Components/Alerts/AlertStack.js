import React from 'react';
import PropTypes from 'prop-types';
import AlertItem from './AlertItem';
import { getPositionAttributes } from './helpers';

const propTypes = {
  position: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  alerts: PropTypes.array.isRequired,
};

class AlertStack extends React.Component {
  render() {
    const self = this;
    const { props } = this;

    if (['bottom left', 'bottom right', 'bottom center'].indexOf(props.position) > -1) {
      props.alerts.reverse();
    }

    const alerts = props.alerts.map(alert => (
      <AlertItem
        ref={`alert-${alert.uid}`}
        key={alert.uid}
        alert={alert}
        onRemove={self.props.onRemove}
        preventAnimation={self.props.preventAnimation}
      />
    ));

    const positionAttributes = getPositionAttributes(props.position);

    return <div className={`alert-container alert-${positionAttributes.className}`}>{alerts}</div>;
  }
}

AlertStack.propTypes = propTypes;

export default AlertStack;
