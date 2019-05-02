import React from 'react';
import PropTypes from 'prop-types';
import PopperJS from 'popper.js';
import BaseText from '../../utils/rnw-compat/BaseText';
import Overlay from '../../utils/Overlay';
import { TRIGGERS } from '../../utils/constants';

/* eslint-disable react/no-unused-prop-types */
const propTypes = {
  title: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  placement: PropTypes.oneOf(PopperJS.placements),
  fallbackPlacement: PropTypes.oneOf(['flip', 'clockwise', 'counterwise']),
  onToggle: PropTypes.func,
  visible: PropTypes.bool,
  trigger: PropTypes.oneOf(TRIGGERS),
  target: PropTypes.node.isRequired,
};
/* eslint-enable */

const defaultProps = {
  onToggle: null,
  visible: null,
  placement: 'bottom',
  fallbackPlacement: null,
  trigger: 'click',
};

class Popover extends React.Component {
  state = {
    visible: false,
    isPressed: false,
    isFocused: false,
  };

  componentDidMount() {
    const { props } = this;

    this.trigger = props.trigger.split(' ');
  }

  onTargetPress = () => {
    const { state } = this;

    // handle click trigger
    if (this.trigger.indexOf('click') !== -1) {
      if (!state.isPressed) {
        this.setState({
          isPressed: !state.isPressed,
        });
        if (!this.visible()) {
          this.onToggle();
        }
      } else {
        this.setState({
          isPressed: !state.isPressed,
        });
        if (this.trigger.indexOf('hover') === -1 && !state.isFocused) {
          this.onToggle();
        }
      }
    }
  };

  onTargetFocus = () => {
    const { state } = this;

    // handle focus trigger
    if (this.trigger.indexOf('focus') !== -1 && !state.isFocused) {
      this.setState({
        isFocused: !state.isFocused,
      });
      if (!this.visible()) {
        this.onToggle();
      }
    }
  };

  onTargetBlur = () => {
    const { state } = this;

    // handle focus trigger
    if (
      this.trigger.indexOf('focus') !== -1 &&
      this.visible() &&
      !state.isPressed
    ) {
      this.setState({
        isFocused: !state.isFocused,
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
    const { state } = this;

    // handle hover trigger
    if (
      this.trigger.indexOf('hover') !== -1 &&
      this.visible() &&
      !state.isPressed &&
      !state.isFocused
    ) {
      this.onToggle();
    }
  };

  onToggle = () => {
    const { props, state } = this;

    if (props.onToggle !== null) {
      props.onToggle();
    }

    if (props.visible === null) {
      this.setState({
        visible: !state.visible,
      });
    }
  };

  visible = () => {
    const { props, state } = this;

    if (props.visible !== null) {
      return props.visible;
    }

    return state.visible;
  };

  render() {
    const { props } = this;

    const target = React.cloneElement(props.target, {
      onPress: this.onTargetPress,
      onFocus: this.onTargetFocus,
      onBlur: this.onTargetBlur,
      onMouseOver: this.onTargetMouseOver,
      onMouseLeave: this.onTargetMouseLeave,
    });

    return (
      <Overlay
        target={target}
        className="popover show"
        placement={props.placement}
        fallbackPlacement={props.fallbackPlacement}
        placementClassName={{
          top: 'bs-popover-top',
          bottom: 'bs-popover-bottom',
          left: 'bs-popover-left',
          right: 'bs-popover-right',
        }}
        visible={this.visible()}
        onToggle={this.onToggle}
        role="tooltip"
      >
        {props.title && (
          <BaseText
            accessibilityRole="heading"
            aria-level={3}
            essentials={{
              className: 'popover-header',
              blockOnly: true,
            }}
          >
            {props.title}
          </BaseText>
        )}
        <BaseText essentials={{ className: 'popover-body', blockOnly: true }}>
          {props.content}
        </BaseText>
      </Overlay>
    );
  }
}

Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;

export default Popover;
