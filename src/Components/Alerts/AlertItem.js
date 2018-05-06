import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import InfoIcon from 'react-icons/lib/fa/info';
import ExclamationIcon from 'react-icons/lib/fa/exclamation';
import CloseIcon from 'react-icons/lib/fa/close';
import CheckIcon from 'react-icons/lib/fa/check';
import { chooseTransitionEvent, Timer } from './helpers';
import Link from '../../Content/Links/Link';
import { BaseText } from '../../utils/components';
import { CloseButton } from '../../utils';
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
    let classes = `alert alert-${alert.color}`;
    let dismiss = null;
    let icon = null;
    let title = null;
    let content = null;

    if (this.state.visible) {
      classes = cx(classes, 'alert-visible');
    } else {
      classes = cx(classes, 'alert-hidden');
    }

    if (alert.icon) {
      classes = cx(classes, 'alert-with-icon');
    }

    if (alert.small) {
      classes = cx(classes, 'alert-sm');
    }

    if (!alert.dismissible) {
      classes = cx(classes, 'alert-not-dismissible');
    }

    if (this.state.removed) {
      classes = cx(classes, 'alert-removed');
    }

    if (alert.icon) {
      switch (alert.color) {
        case 'info':
          icon = <InfoIcon className="alert-icon" />;
          break;
        case 'warning':
          icon = <ExclamationIcon className="alert-icon" />;
          break;
        case 'danger':
          icon = <CloseIcon className="alert-icon" />;
          break;
        case 'success':
          icon = <CheckIcon className="alert-icon" />;
          break;
        default:
          icon = <InfoIcon className="alert-icon" />;
      }
    }

    if (alert.title) {
      title = (
        <BaseText className="alert-title" blockOnly>
          {alert.title}
        </BaseText>
      );
    }

    if (alert.content) {
      content = (
        <BaseText className="alert-content" blockOnly>
          {alert.content}
        </BaseText>
      );
    }

    if (alert.dismissible) {
      dismiss = <CloseButton onClick={this.dismiss} />;
    }

    let body = (
      <span>
        {icon}
        {title}
        {content}
      </span>
    );

    if (alert.link) {
      body = (
        <Link to={alert.link} className="alert-link">
          {content}
        </Link>
      );
    }

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
        {dismiss}
        {body}
      </div>
    );
  }
}

AlertItem.propTypes = propTypes;
AlertItem.childContextTypes = childContextTypes;
AlertItem.defaultProps = defaultProps;

export default AlertItem;
