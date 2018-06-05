import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import InfoIcon from 'react-icons/lib/fa/info';
import ExclamationIcon from 'react-icons/lib/fa/exclamation';
import CloseIcon from 'react-icons/lib/fa/close';
import CheckIcon from 'react-icons/lib/fa/check';
import { Link as RouterLink } from 'react-router-dom';
import { chooseTransitionEvent, Timer } from './helpers';
import { BaseText, CloseButton } from '../../utils/components';
import { COLORS } from '../../utils/constants';

const propTypes = {
  alert: PropTypes.shape({
    uid: PropTypes.number,
    color: PropTypes.oneOf(COLORS),
    title: PropTypes.string,
    content: PropTypes.string,
    link: PropTypes.string,
    autoDismiss: PropTypes.number,
    dismissible: PropTypes.bool,
    icon: PropTypes.bool,
    small: PropTypes.bool,
  }).isRequired,
  onRemove: PropTypes.func,
  preventAnimation: PropTypes.bool,
};

const childContextTypes = {
  onToggle: PropTypes.func.isRequired,
};

const defaultProps = {
  preventAnimation: false,
  onRemove: () => {},
};

class AlertItem extends React.Component {
  state = {
    visible: false,
    removed: false,
  };

  getChildContext() {
    return {
      onToggle: this.onToggle,
    };
  }

  componentWillMount() {
    this.isComponentMounted = false;
    this.preventAnimation = this.props.preventAnimation;
  }

  componentDidMount() {
    const self = this;
    const transitionEvent = chooseTransitionEvent();
    const { alert } = this.props;
    const element = this.item;

    this.isComponentMounted = true;

    // Watch for transition end
    if (!this.preventAnimation) {
      if (transitionEvent) {
        element.addEventListener(transitionEvent, this.onTransitionEnd);
      } else {
        this.preventAnimation = true;
      }
    }

    if (alert.autoDismiss) {
      this.alertTimer = new Timer(() => {
        self.hideAlert();
      }, alert.autoDismiss * 1000);
    }

    this.showAlert();
  }

  componentWillUnmount() {
    const element = this.item;
    const transitionEvent = chooseTransitionEvent();
    element.removeEventListener(transitionEvent, this.onTransitionEnd);
    this.isComponentMounted = false;
  }

  onTransitionEnd = () => {
    if (this.removeCount > 0) return;
    if (this.state.removed) {
      this.removeCount += 1;
      this.removeAlert();
    }
  };

  onMouseEnter = () => {
    const { alert } = this.props;
    if (alert.autoDismiss) {
      this.alertTimer.pause();
    }
  };

  onMouseLeave = () => {
    const { alert } = this.props;
    if (alert.autoDismiss) {
      this.alertTimer.resume();
    }
  };

  onToggle = () => {
    if (this.state.visible) {
      this.hideAlert();
    }
  };

  removeAlert = () => {
    const { alert } = this.props;
    this.props.onRemove(alert.uid);
  };

  dismiss = () => {
    const { alert } = this.props;
    if (!alert.dismissible) {
      return;
    }

    this.hideAlert();
  };

  showAlert = () => {
    const self = this;
    setTimeout(() => {
      if (self.isComponentMounted) {
        self.setState({
          visible: true,
        });
      }
    }, 50);
  };

  hideAlert = () => {
    if (this.alertTimer) {
      this.alertTimer.clear();
    }

    if (this.isComponentMounted) {
      this.setState({
        visible: false,
        removed: true,
      });
    }

    if (this.preventAnimation) {
      this.removeAlert();
    }
  };

  render() {
    const { alert } = this.props;
    const { visible, removed } = this.state;

    const classes = cx(
      // constant classes
      'alert',
      `alert-${alert.color}`,
      // variable classes
      visible && 'alert-visible',
      !visible && 'alert-hidden',
      alert.icon && 'alert-with-icon',
      alert.small && 'alert-sm',
      !alert.dismissible && 'alert-not-dismissible',
      removed && 'alert-removed',
    );

    const body = (
      <React.Fragment>
        {alert.title && (
          <BaseText className="alert-title" blockOnly>
            {alert.title}
          </BaseText>
        )}
        {alert.content && (
          <BaseText className="alert-content" blockOnly>
            {alert.content}
          </BaseText>
        )}
      </React.Fragment>
    );

    const bodyWithLink = alert.link ? (
      <RouterLink
        to={alert.link}
        onClick={alert.dismissible ? this.dismiss : null}
        className="alert-link"
      >
        {body}
      </RouterLink>
    ) : (
      body
    );

    return (
      <div
        className={classes}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        ref={(c) => {
          this.item = c;
        }}
        role="alert"
      >
        {alert.dismissible && <CloseButton onClick={this.dismiss} />}
        {alert.icon && alert.color === 'info' && <InfoIcon className="alert-icon" />}
        {alert.icon && alert.color === 'warning' && <ExclamationIcon className="alert-icon" />}
        {alert.icon && alert.color === 'danger' && <CloseIcon className="alert-icon" />}
        {alert.icon && alert.color === 'success' && <CheckIcon className="alert-icon" />}
        {bodyWithLink}
      </div>
    );
  }
}

AlertItem.propTypes = propTypes;
AlertItem.childContextTypes = childContextTypes;
AlertItem.defaultProps = defaultProps;

export default AlertItem;
