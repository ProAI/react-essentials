import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import { generateKey } from '../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
  size: PropTypes.oneOf(['sm', 'lg']),
  onToggle: PropTypes.func.isRequired,
  onEnter: PropTypes.func,
  onExit: PropTypes.func,
  dismissible: PropTypes.bool,
};

const childContextTypes = {
  onToggle: PropTypes.func.isRequired,
};

const defaultProps = {
  size: null,
  onEnter: null,
  onExit: null,
  dismissible: true,
};

// backwards compatibility for React 15
const canUseDOM = typeof window !== 'undefined';
const isReact15 = ReactDOM.createPortal === undefined;

const computeScrollbarWidth = () => {
  const scrollDiv = document.createElement('div');
  scrollDiv.className = 'modal-scrollbar-measure';
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};

class Modal extends React.Component {
  static Body = ModalBody;
  static Footer = ModalFooter;
  static Header = props => <ModalHeader {...props} />;

  getChildContext() {
    return {
      onToggle: this.props.onToggle,
    };
  }

  componentWillMount() {
    // prevent modal on the server, because ssr does not support portals yet
    if (!canUseDOM) return;

    this.onEnter();

    if (this.props.visible) {
      this.beforeShow();
    }
  }

  componentDidMount() {
    if (this.props.visible) {
      // render modal in React 15
      if (isReact15) this.renderReact15();

      this.afterShow();
    }
  }

  componentWillUpdate(nextProps) {
    if (this.props.visible !== nextProps.visible) {
      if (nextProps.visible) {
        this.beforeShow();
      } else {
        this.beforeHide();
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible) {
      // render modal in React 15
      if (isReact15) this.renderReact15();

      if (this.props.visible) {
        this.afterShow();
      } else {
        this.afterHide();
      }
    }
  }

  componentWillUnmount() {
    this.beforeHide();
    this.afterHide();
  }

  onEnter = () => {
    if (this.props.onEnter) {
      this.props.onEnter();
    }
  };

  onExit = () => {
    this.destroy();

    if (this.props.onExit) {
      this.props.onExit();
    }
  };

  onEscape = (ev) => {
    if (ev.key === 'Escape') {
      this.props.onToggle();
    }
  };

  onBackdropClick = (ev) => {
    const container = this.dialog;

    if (ev.target && !container.contains(ev.target)) {
      this.props.onToggle();
    }
  };

  identifier = generateKey('re-modal-title-');

  destroy = () => {
    const classes = document.body.className.replace('modal-open', '');
    this.removeEvents();

    if (this.container) {
      if (isReact15) ReactDOM.unmountComponentAtNode(this.container);
      document.body.removeChild(this.container);
      this.container = null;
    }

    document.body.className = cx(classes).trim();
  };

  removeEvents() {
    document.removeEventListener('click', this.onBackdropClick, false);
    document.removeEventListener('keyup', this.onEscape, false);
  }

  beforeShow() {
    this.checkScrollbar();
    this.handleScrollbar();

    const classes = document.body.className;
    this.container = document.createElement('div');

    document.body.appendChild(this.container);
    document.addEventListener('click', this.onBackdropClick, false);
    document.addEventListener('keyup', this.onEscape, false);

    document.body.className = cx(classes, 'modal-open');
  }

  afterShow() {
    this.container.focus();
    window.scrollTo(window.scrollX, window.scrollY);

    this.handleUpdate();
  }

  beforeHide() {
    this.resetAdjustments();
    this.resetScrollbar();
  }

  afterHide() {
    this.removeEvents();
    this.onExit();
  }

  handleUpdate() {
    this.adjustDialog();
  }

  adjustDialog() {
    const container = this.dialog;
    const isModalOverflowing = container.scrollHeight > document.documentElement.clientHeight;

    if (!this.isBodyOverflowing && isModalOverflowing) {
      container.style.paddingLeft = `${this.scrollbarWidth}px`;
    }

    if (this.isBodyOverflowing && !isModalOverflowing) {
      container.style.paddingRight = `${this.scrollbarWidth}px`;
    }
  }

  resetAdjustments() {
    const container = this.dialog;

    container.style.paddingLeft = '';
    container.style.paddingRight = '';
  }

  checkScrollbar() {
    let fullWindowWidth = window.innerWidth;
    if (!fullWindowWidth) {
      // workaround for missing window.innerWidth in IE8
      const documentElementRect = document.documentElement.getBoundingClientRect();
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
    }

    this.isBodyOverflowing = document.body.clientWidth < fullWindowWidth;
    this.scrollbarWidth = computeScrollbarWidth();
  }

  handleScrollbar() {
    const bodyPadding = 0;

    this.originalBodyPadding = document.body.style.paddingRight || '';

    if (this.isBodyOverflowing) {
      if (document.getElementById('content')) {
        document.getElementById('content').style.paddingRight = `${bodyPadding +
          this.scrollbarWidth}px`;
      }
      if (document.getElementById('navbar')) {
        document.getElementById('navbar').style.paddingRight = `${bodyPadding +
          this.scrollbarWidth}px`;
      }
    }
  }

  resetScrollbar() {
    if (document.getElementById('content')) {
      document.getElementById('content').style.paddingRight = this.originalBodyPadding;
    }
    if (document.getElementById('navbar')) {
      document.getElementById('navbar').style.paddingRight = this.originalBodyPadding;
    }
  }

  renderModal() {
    const { children, visible } = this.props;

    let sizeClass = '';
    if (this.props.size) {
      sizeClass = ` modal-${this.props.size}`;
    }

    const classes = cx(sizeClass, 'modal-dialog');

    const manipulatedChildren = React.Children.map(children, (child, i) => {
      // inject dismissible and onToggle props in ModalHeader
      if (i === 0) {
        return React.cloneElement(child, {
          dismissible: this.props.dismissible,
          onToggle: this.props.onToggle,
          titleId: this.identifier,
        });
      }

      return child;
    });

    return (
      <div>
        {visible && (
          <div
            className="modal"
            style={{ display: 'block' }}
            tabIndex="-1"
            role="dialog"
            aria-labelledby={this.identifier}
            aria-hidden={!visible}
          >
            <div
              className={classes}
              role="document"
              ref={(c) => {
                this.dialog = c;
              }}
            >
              <div className="modal-content">{manipulatedChildren}</div>
            </div>
          </div>
        )}
        {visible && <div key="modal-backdrop" className="modal-backdrop in" />}
      </div>
    );
  }

  renderReact15() {
    ReactDOM.unstable_renderSubtreeIntoContainer(this, this.renderModal(), this.container);
  }

  render() {
    // prevent modal on the server, because ssr does not support portals yet
    if (!canUseDOM) return null;

    // see componentDidMount and componentDidUpdate for React 15 rendering
    if (isReact15 || !this.props.visible) {
      return null;
    }

    return ReactDOM.createPortal(this.renderModal(), this.container);
  }
}

Modal.propTypes = propTypes;
Modal.childContextTypes = childContextTypes;
Modal.defaultProps = defaultProps;

export default Modal;
