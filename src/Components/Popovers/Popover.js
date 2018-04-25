import React from 'react';
import PropTypes from 'prop-types';
import PopperJS from 'popper.js';
import { Overlay, triggers } from '../../utils';

const propTypes = {
  title: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
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
  trigger: 'click',
};

class Popover extends React.Component {
  state = {
    visible: false,
    isClicked: false,
    isFocused: false,
  };

  componentDidMount() {
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
        className="popover show"
        placement={this.props.placement}
        fallbackPlacement={this.props.fallbackPlacement}
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
        {this.props.title && <h3 className="popover-header">{this.props.title}</h3>}
        <div className="popover-body">{this.props.content}</div>
      </Overlay>
    );
  }
}

Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;

export default Popover;
