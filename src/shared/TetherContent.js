import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Tether from 'tether';

const propTypes = {
  children: PropTypes.node.isRequired,
  arrow: PropTypes.string,
  disabled: PropTypes.bool,
  isOpen: PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.bool,
  ]).isRequired,
  toggle: PropTypes.func.isRequired,
  tether: PropTypes.object.isRequired,
  style: PropTypes.node,
};

class TetherContent extends Component {
  defaultProps = {
    isOpen: false,
  };

  componentDidMount() {
    this.handleProps();
  }

  componentDidUpdate(prevProps) {
    if (this.props.isOpen !== prevProps.isOpen) {
      this.handleProps();
    }
  }

  componentWillUnmount() {
    this.hide();
  }

  getTarget() {
    const target = this.props.tether.target;

    return target;
  }

  getTetherConfig() {
    const config = {
      ...this.props.tether,
    };

    config.element = this.element;
    config.target = this.getTarget();
    return config;
  }

  handleProps() {
    if (this.props.isOpen) {
      this.show();
    } else {
      this.hide();
    }
  }

  hide() {
    if (this.element) {
      document.body.removeChild(this.element);
      ReactDOM.unmountComponentAtNode(this.element);
      this.element = null;
    }

    if (this.tether) {
      this.tether.destroy();
      this.tether = null;
    }
  }

  show() {
    this.element = document.createElement('div');
    document.body.appendChild(this.element);
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      this.renderChildren(),
      this.element
    );

    if (this.props.arrow) {
      const arrow = document.createElement('div');
      arrow.className = `${this.props.arrow}-arrow`;
      this.element.appendChild(arrow);
    }

    this.tether = new Tether(this.getTetherConfig());
    this.tether.position();
    this.element.childNodes[0].focus();
  }

  toggle = (event) => {
    if (this.props.disabled) {
      event.preventDefault();
      return;
    }

    this.props.toggle();
  };

  renderChildren() {
    const { children, style } = this.props;
    return React.cloneElement(
      children,
      {
        style: {
          position: 'relative',
          ...style,
        },
      }
    );
  }

  render() {
    return null;
  }
}

TetherContent.propTypes = propTypes;

export default TetherContent;
