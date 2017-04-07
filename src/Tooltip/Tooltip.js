import React, { Component, PropTypes } from 'react';
import TetherContent from '../shared/TetherContent';
import { getTetherAttachments, tetherAttachements, triggerCombinations } from '../shared/helpers';
import { defaultTetherConfig } from './constants';

const propTypes = {
  children: PropTypes.node.isRequired,
  placement: React.PropTypes.oneOf(tetherAttachements),
  toggle: PropTypes.func,
  target: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  trigger: PropTypes.oneOf(triggerCombinations),
  disabled: PropTypes.bool,
};

const defaultProps = {
  toggle: null,
  isOpen: false,
  placement: 'bottom',
  trigger: 'hover focus',
  disabled: false,
};

class Tooltip extends Component {
  state = {
    isOpen: this.props.isOpen,
    isClicked: false,
    isFocused: false,
  }

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
        if (!this.isOpen()) {
          this.toggle();
        }
      } else {
        this.setState({
          isClicked: !this.state.isClicked,
        });
        if (this.trigger.indexOf('hover') === -1 && !this.state.isFocused) {
          this.toggle();
        }
      }
    }
  }

  onTargetFocus = () => {
    // handle focus trigger
    if (this.trigger.indexOf('focus') !== -1 && !this.state.isFocused) {
      this.setState({
        isFocused: !this.state.isFocused,
      });
      if (!this.isOpen()) {
        this.toggle();
      }
    }
  }

  onTargetBlur = () => {
    // handle focus trigger
    if (this.trigger.indexOf('focus') !== -1
      && this.isOpen()
      && !this.state.isClicked
    ) {
      this.setState({
        isFocused: !this.state.isFocused,
      });
      this.toggle();
    }
  }

  onTargetMouseOver = () => {
    // handle hover trigger
    if (this.trigger.indexOf('hover') !== -1 && !this.isOpen()) {
      this.toggle();
    }
  }

  onTargetMouseLeave = () => {
    // handle hover trigger
    if (this.trigger.indexOf('hover') !== -1
      && this.isOpen()
      && !this.state.isClicked
      && !this.state.isFocused
    ) {
      this.toggle();
    }
  }

  getTetherConfig() {
    const attachments = getTetherAttachments(this.props.placement);
    return {
      ...defaultTetherConfig,
      ...attachments,
      target: `#${this.props.target}`,
    };
  }

  toggle = (e) => {
    if (this.props.disabled) {
      e.preventDefault();
      return;
    }

    if (this.props.toggle) {
      this.props.toggle();
    } else {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    }
  }

  isOpen = () => {
    if (this.props.toggle) {
      return this.props.isOpen;
    }

    return this.state.isOpen;
  }

  render() {
    if (!this.isOpen()) {
      return null;
    }

    const tetherConfig = this.getTetherConfig();

    return (
      <TetherContent
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}
        arrow="tooltip"
        tether={tetherConfig}
        isOpen={this.isOpen()}
        toggle={this.toggle}
      >
        <div className="tooltip-inner">
          {this.props.children}
        </div>
      </TetherContent>
    );
  }
}

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

export default Tooltip;
