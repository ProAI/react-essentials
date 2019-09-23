import React from 'react';
import PropTypes from 'prop-types';
import PopperJS from 'popper.js';
import BaseView from '../../utils/rnw-compat/BaseView';
import BaseText from '../../utils/rnw-compat/BaseText';
import Overlay from '../../utils/Overlay';
import { TRIGGERS } from '../../utils/constants';
import withForwardedRef from '../../utils/withForwardedRef';

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
    isPressed: false,
    isFocused: false,
  };

  componentDidMount() {
    const { trigger } = this.props;

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
    const { target, placement, fallbackPlacement, title, content } = this.props;

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
        className="popover show"
        placement={placement}
        fallbackPlacement={fallbackPlacement}
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
        {title && (
          <BaseText
            accessibilityRole="heading"
            aria-level={3}
            essentials={{
              className: 'popover-header',
              blockOnly: true,
            }}
          >
            {title}
          </BaseText>
        )}
        <BaseView essentials={{ className: 'popover-body' }}>
          {content}
        </BaseView>
      </Overlay>
    );
  }
}

Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;

export default withForwardedRef(Popover);
