import React, { Component, PropTypes } from 'react';
import { chooseTransitionEvent, Timer } from './helpers';
import Link from '../Link/Link';
import CloseButton from '../shared/CloseButton';
import Icon from '../Icon/Icon';

const propTypes = {
  alert: PropTypes.object,
  onRemove: PropTypes.func,
  allowHTML: PropTypes.bool,
  preventAnimation: PropTypes.bool,
};

const childContextTypes = {
  toggle: PropTypes.func.isRequired,
};

const defaultProps = {
  preventAnimation: false,
  onRemove: () => {},
  allowHTML: false,
};

class AlertItem extends Component {
  state = {
    visible: false,
    removed: false,
  }

  getChildContext() {
    return {
      toggle: this.toggle,
    };
  }

  componentWillMount() {
    this.isComponentMounted = false;
    this.preventAnimation = this.props.preventAnimation;
  }

  componentDidMount() {
    const self = this;
    const transitionEvent = chooseTransitionEvent();
    const alert = this.props.alert;
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
      this.removeCount++;
      this.removeAlert();
    }
  }

  onMouseEnter = () => {
    const alert = this.props.alert;
    if (alert.autoDismiss) {
      this.alertTimer.pause();
    }
  }

  onMouseLeave = () => {
    const alert = this.props.alert;
    if (alert.autoDismiss) {
      this.alertTimer.resume();
    }
  }

  toggle = () => {
    if (this.state.visible) {
      this.hideAlert();
    }
  }

  removeAlert = () => {
    this.props.onRemove(this.props.alert.uid);
  }

  dismiss = () => {
    if (!this.props.alert.dismissible) {
      return;
    }

    this.hideAlert();
  }

  showAlert = () => {
    const self = this;
    setTimeout(() => {
      if (self.isComponentMounted) {
        self.setState({
          visible: true,
        });
      }
    }, 50);
  }

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
  }

  allowHTML(string) {
    const html = { __html: string };
    return html;
  }

  render() {
    const alert = this.props.alert;
    let classes = `alert alert-${alert.variant}`;
    let dismiss = null;
    let icon = null;
    let title = null;
    let content = null;

    if (this.state.visible) {
      classes = classNames([
        classes,
        'alert-visible',
      ]);
    } else {
      classes = classNames([
        classes,
        'alert-hidden',
      ]);
    }

    if (alert.icon) {
      classes = classNames([
        classes,
        'alert-with-icon',
      ]);
    }

    if (alert.small) {
      classes = classNames([
        classes,
        'alert-sm',
      ]);
    }

    if (!alert.dismissible) {
      classes = classNames([
        classes,
        'alert-not-dismissible',
      ]);
    }

    if (this.state.removed) {
      classes = classNames([
        classes,
        'alert-removed',
      ]);
    }

    if (alert.icon) {
      let iconType;
      switch (alert.variant) {
        case 'info':
          iconType = 'info';
          break;
        case 'warning':
          iconType = 'attention-alt';
          break;
        case 'danger':
          iconType = 'cancel';
          break;
        case 'success':
          iconType = 'ok';
          break;
        default:
          iconType = 'info';
      }

      icon = (
        <div className="alert-icon">
          <Icon name={iconType} />
        </div>
      );
    }

    if (alert.title) {
      title = <div className="alert-title">{alert.title}</div>;
    }

    if (alert.content) {
      if (this.props.allowHTML) {
        content = (
          <div
            className="alert-content"
            dangerouslySetInnerHTML={this.allowHTML(alert.content)}
          />
        );
      } else {
        content = (
          <div className="alert-content">{alert.content}</div>
        );
      }
    }

    if (alert.dismissible) {
      dismiss = (
        <CloseButton onClick={this.dismiss} />
      );
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
        <Link to={alert.link} className="alert-link">{content}</Link>
      );
    }

    return (
      <div
        className={classes}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        ref={c => { this.item = c; }}
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
