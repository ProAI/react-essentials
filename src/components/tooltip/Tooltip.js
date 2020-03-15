import React from 'react';
import PropTypes from 'prop-types';
import PopperJS from 'popper.js';
import BaseText from '../../utils/rnw-compat/BaseText';
import Overlay from '../Overlay';
import { TRIGGERS } from '../../utils/constants';
import withForwardedRef from '../../utils/withForwardedRef';

const propTypes = {
  title: PropTypes.node.isRequired,
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
  trigger: 'hover focus',
};

class Tooltip extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      visible: false,
      isPressed: false,
      isFocused: false,
    };
  }

  componentDidMount() {
    const { trigger } = this.props;

    // this.target = document.querySelector(`[aria-describedby="${this.identifier}"]`);
    this.trigger = trigger.split(' ');
  }

  onTargetPress = event => {
    const {
      state,
      props: { target },
    } = this;

    // handle target onPress
    if (target.props.onPress) {
      target.props.onPress(event);
    }

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

  onTargetFocus = event => {
    const {
      state,
      props: { target },
    } = this;

    // handle target onFocus
    if (target.props.onFocus) {
      target.props.onFocus(event);
    }

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

  onTargetBlur = event => {
    const {
      state,
      props: { target },
    } = this;

    // handle target onBlur
    if (target.props.onBlur) {
      target.props.onBlur(event);
    }

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

  onTargetMouseOver = event => {
    const {
      props: { target },
    } = this;

    // handle target onMouseOver
    if (target.props.onMouseOver) {
      target.props.onMouseOver(event);
    }

    // handle hover trigger
    if (this.trigger.indexOf('hover') !== -1 && !this.visible()) {
      this.onToggle();
    }
  };

  onTargetMouseLeave = event => {
    const {
      state,
      props: { target },
    } = this;

    // handle target onMouseLeave
    if (target.props.onMouseLeave) {
      target.props.onMouseLeave(event);
    }

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
    const { onToggle, visible } = this.props;
    const { state } = this;

    if (onToggle !== null) {
      onToggle();
    }

    if (visible === null) {
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
    const { target, placement, fallbackPlacement, title } = this.props;

    const clonedTarget = React.cloneElement(target, {
      onPress: this.onTargetPress,
      onFocus: this.onTargetFocus,
      onBlur: this.onTargetBlur,
      onMouseOver: this.onTargetMouseOver,
      onMouseLeave: this.onTargetMouseLeave,
    });

    return (
      <Overlay
        target={clonedTarget}
        className="tooltip show"
        placement={placement}
        fallbackPlacement={fallbackPlacement}
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
          {title}
        </BaseText>
      </Overlay>
    );
  }
}

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

export default withForwardedRef(Tooltip);
