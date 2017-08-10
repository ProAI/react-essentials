import React from 'react';
import PropTypes from 'prop-types';
import { Overlay, placements, triggers } from '../utils';

const propTypes = {
  title: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  placement: PropTypes.oneOf(placements),
  onToggle: PropTypes.func,
  visible: PropTypes.bool,
  trigger: PropTypes.oneOf(triggers),
  disabled: PropTypes.bool,
  target: PropTypes.node.isRequired,
};

const defaultProps = {
  onToggle: null,
  visible: false,
  placement: 'bottom',
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

  visible = () => {
    if (this.props.onToggle) {
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
        className="popover"
        placement={this.props.placement}
        visible={this.visible()}
        onToggle={this.onToggle}
        role="tooltip"
      >
        <div className="popover-inner">
          {this.props.title &&
            <h3 className="popover-title">
              {this.props.title}
            </h3>}
          <div className="popover-content">
            {this.props.content}
          </div>
        </div>
      </Overlay>
    );
  }
}

Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;

export default Popover;
