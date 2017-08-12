import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import PopperJS from 'popper.js';
import cx from 'classnames';
import generateKey from '../generateKey';

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
  disabled: false,
  visible: false,
  placement: 'bottom',
  fallbackPlacement: null,
  style: null,
};

class Overlay extends React.Component {
  state = {
    placement: this.props.placement,
    arrowStyle: null,
    popperStyle: null,
  };

  componentDidMount() {
    // create overlay if visibility is visible
    if (this.props.visible) {
      this.create();
    }
  }

  componentDidUpdate(prevProps) {
    // create overlay if visibility changed to visible
    if (this.props.visible && this.props.visible !== prevProps.visible) {
      this.create();
    }

    // update overlay if visibility is still visible
    if (this.props.visible && this.props.visible === prevProps.visible) {
      this.update();
    }

    // destroy overlay if visibility changed to invisible
    if (!this.props.visible && this.props.visible !== prevProps.visible) {
      this.destroy();
    }
  }

  componentWillUnmount() {
    // force destroy overlay
    this.destroy();
  }

  identifier = generateKey('re-overlay-');

  create() {
    // render overlay container
    if (!this.container) {
      this.container = document.createElement('div');
      document.body.appendChild(this.container);
    }
    ReactDOM.unstable_renderSubtreeIntoContainer(this, this.renderPopper(), this.container);

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

  update() {
    // rerender overlay container
    ReactDOM.unstable_renderSubtreeIntoContainer(this, this.renderPopper(), this.container);
  }

  destroy() {
    // destroy overlay container
    if (this.container) {
      ReactDOM.unmountComponentAtNode(this.container);
      document.body.removeChild(this.container);
      this.container = null;
    }

    // destroy PopperJS instance
    if (this.instance) {
      this.instance.destroy();
    }
  }

  renderPopper() {
    const { role, children, className, placementClassName } = this.props;
    const { placement, popperStyle, arrowStyle } = this.state;

    const classes = cx(className, placementClassName[placement]);

    return (
      <div
        ref={(element) => {
          this.popper = element;
        }}
        role={role}
        className={classes}
        style={popperStyle}
      >
        <div
          ref={(element) => {
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
    // For some reason a ref that is defined on a cloned element does not work,
    // so we use a wrapping <span> element, on which we can define the ref.
    // This is just a workaround, so it would be better to solve the original
    // cloned element issue.

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
      </span>
    );
  }
}

Overlay.propTypes = propTypes;
Overlay.defaultProps = defaultProps;

export default Overlay;
