import React from 'react';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';
import { findNodeHandle } from 'react-native-web';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import PopperJS from 'popper.js';
import cx from 'classnames';
import Context from '../Context';

const { canUseDOM } = ExecutionEnvironment;

const propTypes = {
  children: PropTypes.node.isRequired,
  target: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  placement: PropTypes.oneOf(PopperJS.placements),
  fallbackPlacement: PropTypes.oneOf(['flip', 'clockwise', 'counterwise']),
  placementClassName: PropTypes.shape({
    top: PropTypes.string,
    bottom: PropTypes.string,
    left: PropTypes.string,
    right: PropTypes.string,
  }).isRequired,
  visible: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
};

const defaultProps = {
  placement: 'bottom',
  fallbackPlacement: null,
};

class Overlay extends React.Component {
  static contextType = Context;

  constructor(props, context) {
    super(props, context);

    this.identifier = context.generateKey('re-overlay-');

    this.state = {
      placement: props.placement,
      arrowStyle: null,
      popperStyle: null,
    };
  }

  componentWillMount() {
    const { visible } = this.props;

    // prevent modal on the server, because ssr does not support portals yet
    if (!canUseDOM) return;

    // create overlay if visibility is visible
    if (visible) {
      this.beforeCreate();
    }
  }

  componentDidMount() {
    const { visible } = this.props;

    // create overlay if visibility is visible
    if (visible) {
      this.afterCreate();
    }
  }

  componentWillUpdate(nextProps) {
    const { visible } = this.props;

    // create overlay if visibility changed to visible
    if (nextProps.visible && visible !== nextProps.visible) {
      this.beforeCreate();
    }
  }

  componentDidUpdate(prevProps) {
    const { visible } = this.props;

    // create overlay if visibility changed to visible
    if (visible && visible !== prevProps.visible) {
      this.afterCreate();
    }

    // destroy overlay if visibility changed to invisible
    if (!visible && visible !== prevProps.visible) {
      this.afterDestroy();
    }
  }

  componentWillUnmount() {
    // force destroy overlay
    this.afterDestroy();
  }

  beforeCreate() {
    // render overlay container
    if (!this.container) {
      this.container = document.createElement('div');
      document.body.appendChild(this.container);
    }
  }

  afterCreate() {
    const { placement, fallbackPlacement } = this.props;

    // create PopperJS instance
    this.instance = new PopperJS(
      findNodeHandle(this.target),
      findNodeHandle(this.popper),
      {
        placement,
        modifiers: {
          arrow: {
            element: findNodeHandle(this.arrow),
          },
          flip: {
            enabled: fallbackPlacement !== null,
            behavior: fallbackPlacement,
          },
          applyStyle: { enabled: false },
          applyReactStyle: {
            enabled: true,
            fn: data => {
              this.setState({
                placement: data.placement,
                arrowStyle: data.offsets.arrow,
                popperStyle: data.styles,
              });

              return data;
            },
            order: 900,
          },
        },
      },
    );

    this.instance.scheduleUpdate();
  }

  afterDestroy() {
    // destroy overlay container
    if (this.container) {
      document.body.removeChild(this.container);
      this.container = null;
    }

    // destroy PopperJS instance
    if (this.instance) {
      this.instance.destroy();
    }
  }

  renderOverlay() {
    const { role, children, className, placementClassName } = this.props;
    const { placement, popperStyle, arrowStyle } = this.state;

    const classes = cx('yv', className, placementClassName[placement]);

    return (
      <div
        ref={element => {
          this.popper = element;
        }}
        role={role}
        style={popperStyle}
        className={classes}
      >
        <div
          ref={element => {
            this.arrow = element;
          }}
          className="arrow"
          style={arrowStyle}
        />
        {children}
      </div>
    );
  }

  render() {
    const { target, visible } = this.props;

    const targetElement = React.cloneElement(target, {
      'aria-describedby': visible ? this.identifier : null,
    });

    // It is not possible to define a ref on a cloned element, so we use a
    // wrapping <span> element, on which we can define the ref.
    return (
      <span
        ref={element => {
          this.target = element;
        }}
        style={{ display: 'inline-block' }}
      >
        {targetElement}
        {canUseDOM &&
          visible &&
          ReactDOM.createPortal(this.renderOverlay(), this.container)}
      </span>
    );
  }
}

Overlay.propTypes = propTypes;
Overlay.defaultProps = defaultProps;

export default Overlay;
