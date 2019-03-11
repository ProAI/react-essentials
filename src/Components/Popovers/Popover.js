import React from 'react';
import PropTypes from 'prop-types';
import PopperJS from 'popper.js';
import { BaseText, Overlay } from '../../utils/components';
import { TRIGGERS } from '../../utils/constants';

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
    isClicked: false,
    isFocused: false,
  };

  componentDidMount() {
    const { props } = this;

    this.trigger = props.trigger.split(' ');
  }

  onTargetClick = () => {
    const { state } = this;

    // handle click trigger
    if (this.trigger.indexOf('click') !== -1) {
      if (!state.isClicked) {
        this.setState({
          isClicked: !state.isClicked,
        });
        if (!this.visible()) {
          this.onToggle();
        }
      } else {
        this.setState({
          isClicked: !state.isClicked,
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
    if (this.trigger.indexOf('focus') !== -1 && this.visible() && !state.isClicked) {
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
      !state.isClicked &&
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
      onClick: this.onTargetClick,
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
          <BaseText tag="h3" className="popover-header" blockOnly>
            {props.title}
          </BaseText>
        )}
        <BaseText className="popover-body" blockOnly>
          {props.content}
        </BaseText>
      </Overlay>
    );
  }
}

Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;

export default Popover;
