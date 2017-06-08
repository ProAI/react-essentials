import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import TetherContent from '../shared/TetherContent';
import { getTetherAttachments, tetherAttachements, triggerCombinations } from '../shared/helpers';
import { defaultTetherConfig } from './constants';

const propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  placement: PropTypes.oneOf(tetherAttachements),
  onToggle: PropTypes.func,
  target: PropTypes.string.isRequired,
  visible: PropTypes.bool,
  trigger: PropTypes.oneOf(triggerCombinations),
  disabled: PropTypes.bool,
};

const defaultProps = {
  className: null,
  visible: false,
  placement: 'bottom',
  onToggle: null,
  trigger: 'click',
  disabled: false,
};

class Popover extends React.Component {
  state = {
    visible: this.props.visible,
    isClicked: false,
    isFocused: false,
  };

  componentDidMount() {
    this.target = document.getElementById(this.props.target);
    this.trigger = this.props.trigger.split(' ');

    if (this.trigger.indexOf('click') !== -1) {
      this.target.addEventListener('click', this.onTargetClick);
    }
    if (this.trigger.indexOf('focus') !== -1) {
      this.target.addEventListener('focus', this.onTargetFocus);
      this.target.addEventListener('blur', this.onTargetBlur);
    }
    if (this.trigger.indexOf('hover') !== -1) {
      this.target.addEventListener('mouseover', this.onTargetMouseOver);
      this.target.addEventListener('mouseout', this.onTargetMouseLeave);
    }
  }

  componentWillUnmount() {
    if (this.trigger.indexOf('click') !== -1) {
      this.target.removeEventListener('click', this.onTargetClick);
    }
    if (this.trigger.indexOf('focus') !== -1) {
      this.target.removeEventListener('focus', this.onTargetFocus);
      this.target.removeEventListener('blur', this.onTargetBlur);
    }
    if (this.trigger.indexOf('hover') !== -1) {
      this.target.removeEventListener('mouseover', this.onTargetMouseOver);
      this.target.removeEventListener('mouseout', this.onTargetMouseLeave);
    }
  }

  onTargetClick = () => {
    // handle click trigger
    if (this.trigger.indexOf('click') !== -1) {
      if (!this.state.isClicked) {
        this.setState({
          isClicked: !this.state.isClicked,
        });
        if (!this.visible()) {
          this.onToggle();
        }
      } else {
        this.setState({
          isClicked: !this.state.isClicked,
        });
        if (this.trigger.indexOf('hover') === -1 && !this.state.isFocused) {
          this.onToggle();
        }
      }
    }
  };

  onTargetFocus = () => {
    // handle focus trigger
    if (this.trigger.indexOf('focus') !== -1 && !this.state.isFocused) {
      this.setState({
        isFocused: !this.state.isFocused,
      });
      if (!this.visible()) {
        this.onToggle();
      }
    }
  };

  onTargetBlur = () => {
    // handle focus trigger
    if (this.trigger.indexOf('focus') !== -1 && this.visible() && !this.state.isClicked) {
      this.setState({
        isFocused: !this.state.isFocused,
      });
      this.onToggle();
    }
  };

  onTargetMouseOver = () => {
    // handle hover trigger
    if (this.trigger.indexOf('hover') !== -1 && !this.visible()) {
      this.onToggle();
    }
  };

  onTargetMouseLeave = () => {
    // handle hover trigger
    if (
      this.trigger.indexOf('hover') !== -1 &&
      this.visible() &&
      !this.state.isClicked &&
      !this.state.isFocused
    ) {
      this.onToggle();
    }
  };

  onToggle = (e) => {
    if (this.props.disabled) {
      e.preventDefault();
      return;
    }

    if (this.props.onToggle) {
      this.props.onToggle();
    } else {
      this.setState({
        visible: !this.state.visible,
      });
    }
  };

  getTetherConfig() {
    const attachments = getTetherAttachments(this.props.placement);
    return {
      ...defaultTetherConfig,
      ...attachments,
      target: `#${this.props.target}`,
    };
  }

  visible = () => {
    if (this.props.onToggle) {
      return this.props.visible;
    }

    return this.state.visible;
  };

  render() {
    const { children, title, className } = this.props;

    if (!this.visible()) {
      return null;
    }

    const tetherConfig = this.getTetherConfig();

    const classes = cx(className, 'popover-content');

    return (
      <TetherContent
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}
        arrow="popover"
        tether={tetherConfig}
        visible={this.visible()}
        onToggle={this.onToggle}
      >
        <div className="popover-inner">
          {title && <h3 className="popover-title">{title}</h3>}
          <div className={classes}>
            {children}
          </div>
        </div>
      </TetherContent>
    );
  }
}

Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;

export default Popover;
