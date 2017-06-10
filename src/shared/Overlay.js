import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Tether from 'tether';
import { getTetherAttachments, tetherAttachements } from '../shared/helpers';
import IdentifierGenerator from '../shared/IdentifierGenerator';

const propTypes = {
  children: PropTypes.node.isRequired,
  target: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  arrowClassName: PropTypes.string,
  placement: PropTypes.oneOf(tetherAttachements),
  disabled: PropTypes.bool,
  visible: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
  onToggle: PropTypes.func.isRequired,
  style: PropTypes.object,
  role: PropTypes.string.isRequired,
};

const defaultProps = {
  arrowClassName: null,
  disabled: false,
  visible: false,
  placement: 'bottom',
  style: null,
};

class Overlay extends React.Component {
  componentDidMount() {
    this.handleProps();
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible) {
      this.handleProps();
    }
  }

  componentWillUnmount() {
    this.hide();
  }

  onToggle = (event) => {
    if (this.props.disabled) {
      event.preventDefault();
      return;
    }

    this.props.onToggle();
  };

  getTetherConfig() {
    const attachments = getTetherAttachments(this.props.placement);

    return {
      element: this.element,
      ...attachments,
      target: `[aria-describedby="${this.genIdentifier}"]`,
      classPrefix: 'bs-tether',
      classes: { element: this.props.className, enabled: 'show' },
      constraints: [
        { to: 'scrollParent', attachment: 'together none' },
        { to: 'window', attachment: 'together none' },
      ],
    };
  }

  genIdentifier = IdentifierGenerator.generate('gen-overlay-');

  handleProps() {
    if (this.props.visible) {
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
    this.element.setAttribute('role', this.props.role);
    this.element.setAttribute('id', this.genIdentifier);
    document.body.appendChild(this.element);
    ReactDOM.unstable_renderSubtreeIntoContainer(this, this.renderChildren(), this.element);

    if (this.props.arrowClassName) {
      const arrow = document.createElement('div');
      arrow.setAttribute('class', this.props.arrowClassName);
      this.element.appendChild(arrow);
    }

    this.tether = new Tether(this.getTetherConfig());
    this.tether.position();
    this.element.childNodes[0].focus();
  }

  renderChildren() {
    const { children, style } = this.props;

    return React.cloneElement(children, {
      style: {
        position: 'relative',
        ...style,
      },
    });
  }

  render() {
    return React.cloneElement(this.props.target, {
      'aria-describedby': this.props.visible ? this.genIdentifier : null,
    });
  }
}

Overlay.propTypes = propTypes;
Overlay.defaultProps = defaultProps;

export default Overlay;
