import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import PopperJS from 'popper.js';
import cx from 'classnames';
import Context from '../Context';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  target: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  placement: PropTypes.oneOf(PopperJS.placements),
  // eslint-disable-next-line react/no-unused-prop-types
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

// backwards compatibility for React 15
const canUseDOM = typeof window !== 'undefined';
const isReact15 = ReactDOM.createPortal === undefined;

class Overlay extends React.Component {
  static contextType = Context;

  constructor(props, context) {
    super(props, context);

    this.identifier = context.generateKey('re-overlay-');
  }

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    placement: this.props.placement,
    arrowStyle: null,
    popperStyle: null,
  };

  componentWillMount() {
    const { props } = this;

    // prevent modal on the server, because ssr does not support portals yet
    if (!canUseDOM) return;

    // create overlay if visibility is visible
    if (props.visible) {
      this.beforeCreate();
    }
  }

  componentDidMount() {
    const { props } = this;

    // create overlay if visibility is visible
    if (props.visible) {
      // render modal in React 15
      if (isReact15) this.renderReact15();

      this.afterCreate();
    }
  }

  componentWillUpdate(nextProps) {
    const { props } = this;

    // create overlay if visibility changed to visible
    if (nextProps.visible && props.visible !== nextProps.visible) {
      // render modal in React 15
      if (isReact15) this.renderReact15();

      this.beforeCreate();
    }
  }

  componentDidUpdate(prevProps) {
    const { props } = this;

    // create overlay if visibility changed to visible
    if (props.visible && props.visible !== prevProps.visible) {
      // render modal in React 15
      if (isReact15) this.renderReact15();

      this.afterCreate();
    }

    // update overlay if visibility is still visible
    if (props.visible && props.visible === prevProps.visible) {
      // rerender modal in React 15
      if (isReact15) this.renderReact15();
    }

    // destroy overlay if visibility changed to invisible
    if (!props.visible && props.visible !== prevProps.visible) {
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
    const { props } = this;

    // create PopperJS instance
    this.instance = new PopperJS(this.target, this.popper, {
      placement: props.placement,
      modifiers: {
        arrow: {
          element: this.arrow,
        },
        flip: {
          enabled: props.fallbackPlacement !== null,
          behavior: props.fallbackPlacement,
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

  renderReact15() {
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      this.renderOverlay(),
      this.container,
    );
  }

  render() {
    const { props } = this;

    // TODO: For some reason a ref that is defined on a cloned element does not
    // work, so we use a wrapping <span> element, on which we can define the
    // ref. This is just a workaround, so it would be better to solve the
    // original cloned element issue.

    const target = React.cloneElement(props.target, {
      /* ref: (element) => {
        this.target = element;
      }, */
      'aria-describedby': props.visible ? this.identifier : null,
    });

    return (
      <span
        ref={element => {
          this.target = element;
        }}
        style={{ display: 'inline-block' }}
      >
        {target}
        {!isReact15 &&
          canUseDOM &&
          props.visible &&
          ReactDOM.createPortal(this.renderOverlay(), this.container)}
      </span>
    );
  }
}

Overlay.propTypes = propTypes;
Overlay.defaultProps = defaultProps;

export default Overlay;
