import React from 'react';
import PropTypes from 'prop-types';
import PopperJS from 'popper.js';
import BaseText from '../../utils/rnw-compat/BaseText';
import Overlay from '../../utils/Overlay';
import { TRIGGERS } from '../../utils/constants';

/* eslint-disable react/no-unused-prop-types */
const propTypes = {
  title: PropTypes.node.isRequired,
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
  trigger: 'hover focus',
};

class Tooltip extends React.Component {
  state = {
    visible: false,
    isPressed: false,
    isFocused: false,
  };

  componentDidMount() {
    const { props } = this;

    // this.target = document.querySelector(`[aria-describedby="${this.identifier}"]`);
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
        className="tooltip show"
        placement={props.placement}
        fallbackPlacement={props.fallbackPlacement}
        placementClassName={{
          top: 'bs-tooltip-top',
          bottom: 'bs-tooltip-bottom',
          left: 'bs-tooltip-left',
          right: 'bs-tooltip-right',
        }}
        visible={this.visible()}
        onToggle={this.onToggle}
        role="tooltip"
      >
        <BaseText essentials={{ className: 'tooltip-inner', blockOnly: true }}>
          {props.title}
        </BaseText>
      </Overlay>
    );
  }
}

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

export default Tooltip;
