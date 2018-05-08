import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import PopperJS from 'popper.js';
import cx from 'classnames';
import BaseView from './BaseView';

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

const contextTypes = {
  generateKey: PropTypes.func.isRequired,
};

const defaultProps = {
  placement: 'bottom',
  fallbackPlacement: null,
};

// backwards compatibility for React 15
const canUseDOM = typeof window !== 'undefined';
const isReact15 = ReactDOM.createPortal === undefined;

class Overlay extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.identifier = context.generateKey('re-overlay-');
  }

  state = {
    placement: this.props.placement,
    arrowStyle: null,
    popperStyle: null,
  };

  componentWillMount() {
    // prevent modal on the server, because ssr does not support portals yet
    if (!canUseDOM) return;

    // create overlay if visibility is visible
    if (this.props.visible) {
      this.beforeCreate();
    }
  }

  componentDidMount() {
    // create overlay if visibility is visible
    if (this.props.visible) {
      // render modal in React 15
      if (isReact15) this.renderReact15();

      this.afterCreate();
    }
  }

  componentWillUpdate(nextProps) {
    // create overlay if visibility changed to visible
    if (nextProps.visible && this.props.visible !== nextProps.visible) {
      // render modal in React 15
      if (isReact15) this.renderReact15();

      this.beforeCreate();
    }
  }

  componentDidUpdate(prevProps) {
    // create overlay if visibility changed to visible
    if (this.props.visible && this.props.visible !== prevProps.visible) {
      // render modal in React 15
      if (isReact15) this.renderReact15();

      this.afterCreate();
    }

    // update overlay if visibility is still visible
    if (this.props.visible && this.props.visible === prevProps.visible) {
      // rerender modal in React 15
      if (isReact15) this.renderReact15();
    }

    // destroy overlay if visibility changed to invisible
    if (!this.props.visible && this.props.visible !== prevProps.visible) {
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
    // create PopperJS instance
    this.instance = new PopperJS(this.target, this.popper, {
      placement: this.props.placement,
      modifiers: {
        arrow: {
          element: this.arrow,
        },
        flip: {
          enabled: this.props.fallbackPlacement !== null,
          behavior: this.props.fallbackPlacement,
        },
        applyStyle: { enabled: false },
        applyReactStyle: {
          enabled: true,
          fn: (data) => {
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
    });

    this.instance.scheduleUpdate();
  }

  afterDestroy() {
    // destroy overlay container
    if (this.container) {
      if (isReact15) ReactDOM.unmountComponentAtNode(this.container);
      document.body.removeChild(this.container);
      this.container = null;
    }

    // destroy PopperJS instance
    if (this.instance) {
      this.instance.destroy();
    }
  }

  renderOverlay() {
    const {
      role, children, className, placementClassName,
    } = this.props;
    const { placement, popperStyle, arrowStyle } = this.state;

    const classes = cx(className, placementClassName[placement]);

    return (
      <BaseView
        elementProps={{
          ref: (element) => {
            this.popper = element;
          },
          role,
          style: popperStyle,
        }}
        className={classes}
      >
        <div
          ref={(element) => {
            this.arrow = element;
          }}
          className="arrow"
          style={arrowStyle}
        />
        {children}
      </BaseView>
    );
  }

  renderReact15() {
    ReactDOM.unstable_renderSubtreeIntoContainer(this, this.renderOverlay(), this.container);
  }

  render() {
    // TODO: For some reason a ref that is defined on a cloned element does not
    // work, so we use a wrapping <span> element, on which we can define the
    // ref. This is just a workaround, so it would be better to solve the
    // original cloned element issue.

    const target = React.cloneElement(this.props.target, {
      /* ref: (element) => {
        this.target = element;
      }, */
      'aria-describedby': this.props.visible ? this.identifier : null,
    });

    return (
      <span
        ref={(element) => {
          this.target = element;
        }}
        style={{ display: 'inline-block' }}
      >
        {target}
        {!isReact15 &&
          canUseDOM &&
          this.props.visible &&
          ReactDOM.createPortal(this.renderOverlay(), this.container)}
      </span>
    );
  }
}

Overlay.propTypes = propTypes;
Overlay.contextTypes = contextTypes;
Overlay.defaultProps = defaultProps;

export default Overlay;
