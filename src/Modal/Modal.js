import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import IdentifierGenerator from '../shared/IdentifierGenerator';

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
    this.onEnter();
  }

  componentDidMount() {
    if (this.props.visible) {
      this.show();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible) {
      this.handleProps();
    }
  }

  componentWillUnmount() {
    this.onExit();
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
    if (ev.keyCode === 27) {
      this.props.onToggle();
    }
  };

  onBackdropClick = (ev) => {
    const container = this.dialog;

    if (ev.target && !container.contains(ev.target)) {
      this.props.onToggle();
    }
  };

  genIdentifier = IdentifierGenerator.generate('gen-modal-title-');

  handleProps = () => {
    if (this.props.visible) {
      this.show();
    } else {
      this.hide();
    }
  };

  destroy = () => {
    const classes = document.body.className.replace('modal-open', '');
    this.removeEvents();

    if (this.element) {
      ReactDOM.unmountComponentAtNode(this.element);
      document.body.removeChild(this.element);
      this.element = null;
    }

    document.body.className = cx(classes).trim();
  };

  removeEvents() {
    document.removeEventListener('click', this.onBackdropClick, false);
    document.removeEventListener('keyup', this.onEscape, false);
  }

  hide() {
    this.resetAdjustments();
    this.resetScrollbar();

    this.renderIntoSubtree();
    this.removeEvents();

    this.onExit();
  }

  show() {
    this.checkScrollbar();
    this.handleScrollbar();

    const classes = document.body.className;
    this.element = document.createElement('div');
    this.element.setAttribute('tabindex', '-1');

    document.body.appendChild(this.element);
    document.addEventListener('click', this.onBackdropClick, false);
    document.addEventListener('keyup', this.onEscape, false);

    document.body.className = cx(classes, 'modal-open');

    this.renderIntoSubtree();

    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    this.element.focus();
    window.scrollTo(scrollX, scrollY);

    this.handleUpdate();
  }

  // ----------------------------------------------------------------------
  // the following methods are used to handle overflowing modals
  // todo (fat): these should probably be refactored out of modal.js
  // ----------------------------------------------------------------------

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

  // ----------------------------------------------------------------------
  // Rendering
  // ----------------------------------------------------------------------

  renderIntoSubtree() {
    ReactDOM.unstable_renderSubtreeIntoContainer(this, this.renderChildren(), this.element);
  }

  renderChildren() {
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
          titleId: this.genIdentifier,
        });
      }

      return child;
    });

    return (
      <div>
        {visible &&
          <div
            className="modal"
            style={{ display: 'block' }}
            tabIndex="-1"
            role="dialog"
            aria-labelledby={this.genIdentifier}
            aria-hidden={!visible}
          >
            <div
              className={classes}
              role="document"
              ref={(c) => {
                this.dialog = c;
              }}
            >
              <div className="modal-content">
                {manipulatedChildren}
              </div>
            </div>
          </div>}
        {visible && <div key="modal-backdrop" className="modal-backdrop in" />}
      </div>
    );
  }

  render() {
    return null;
  }
}

Modal.propTypes = propTypes;
Modal.childContextTypes = childContextTypes;
Modal.defaultProps = defaultProps;

export default Modal;
