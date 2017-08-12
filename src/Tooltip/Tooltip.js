import React from 'react';
import PropTypes from 'prop-types';
import PopperJS from 'popper.js';
import { Overlay, triggers } from '../utils';

const propTypes = {
  title: PropTypes.node.isRequired,
  placement: PropTypes.oneOf(PopperJS.placements),
  fallbackPlacement: PropTypes.oneOf(['flip', 'clockwise', 'counterwise']),
  onToggle: PropTypes.func,
  visible: PropTypes.bool,
  trigger: PropTypes.oneOf(triggers),
  target: PropTypes.node.isRequired,
};

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
    isClicked: false,
    isFocused: false,
  };

  componentDidMount() {
    // this.target = document.querySelector(`[aria-describedby="${this.identifier}"]`);
    this.trigger = this.props.trigger.split(' ');
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

  onToggle = () => {
    if (this.props.onToggle !== null) {
      this.props.onToggle();
    }

    if (this.props.visible === null) {
      this.setState({
        visible: !this.state.visible,
      });
    }
  };

  visible = () => {
    if (this.props.visible !== null) {
      return this.props.visible;
    }

    return this.state.visible;
  };

  render() {
    const target = React.cloneElement(this.props.target, {
      onClick: this.onTargetClick,
      onFocus: this.onTargetFocus,
      onBlur: this.onTargetBlur,
      onMouseOver: this.onTargetMouseOver,
      onMouseLeave: this.onTargetMouseLeave,
    });

    return (
      <Overlay
        target={target}
        className="tooltip show"
        placement={this.props.placement}
        fallbackPlacement={this.props.fallbackPlacement}
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
        <div className="tooltip-inner">
          {this.props.title}
        </div>
      </Overlay>
    );
  }
}

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

export default Tooltip;
