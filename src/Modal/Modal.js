import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

const propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  size: PropTypes.string,
  toggle: PropTypes.func,
  onEnter: PropTypes.func,
  onExit: PropTypes.func,
  dismissible: PropTypes.bool,
};

const childContextTypes = {
  toggle: PropTypes.func.isRequired,
  dismissible: PropTypes.bool.isRequired,
};

const defaultProps = {
  isOpen: false,
  dismissible: true,
};

class Modal extends Component {
  getChildContext() {
    return {
      toggle: this.props.toggle,
      dismissible: this.props.dismissible,
    };
  }

  componentWillMount() {
    this.onEnter();
  }

  componentDidMount() {
    if (this.props.isOpen) {
      this.show();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isOpen !== prevProps.isOpen) {
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
  }

  onExit = () => {
    this.destroy();
    if (this.props.onExit) {
      this.props.onExit();
    }
  }

  onEscape = (ev) => {
    if (ev.keyCode === 27) {
      this.props.toggle();
    }
  }

  onBackdropClick = (ev) => {
    const container = this.dialog;

    if (ev.target && !container.contains(ev.target)) {
      this.props.toggle();
    }
  }

  handleProps = () => {
    if (this.props.isOpen) {
      this.show();
    } else {
      this.hide();
    }
  }

  destroy = () => {
    const classes = document.body.className.replace('modal-open', '');
    this.removeEvents();

    if (this.element) {
      ReactDOM.unmountComponentAtNode(this.element);
      document.body.removeChild(this.element);
      this.element = null;
    }

    document.body.className = classNames(classes).trim();
  }

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

    document.body.className = classNames([
      classes,
      'modal-open',
    ]);

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
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      const documentElementRect = document.documentElement.getBoundingClientRect();
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
    }
    this.isBodyOverflowing = document.body.clientWidth < fullWindowWidth;
    this.scrollbarWidth = this.computeScrollbarWidth();
  }

  handleScrollbar() {
    const bodyPadding = 0;

    this.originalBodyPadding = document.body.style.paddingRight || '';

    if (this.isBodyOverflowing) {
      document.getElementById('content-body').style.paddingRight
       = `${bodyPadding + this.scrollbarWidth}px`;
      document.getElementsByClassName('navbar-fixed-top')[0].style.paddingRight
       = `${bodyPadding + this.scrollbarWidth}px`;
    }
  }

  resetScrollbar() {
    document.getElementById('content-body').style.paddingRight
     = this.originalBodyPadding;
    document.getElementsByClassName('navbar-fixed-top')[0].style.paddingRight
     = this.originalBodyPadding;
  }

  computeScrollbarWidth() { // thx d.walsh
    const scrollDiv = document.createElement('div');
    scrollDiv.className = 'modal-scrollbar-measure';
    document.body.appendChild(scrollDiv);
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  }


  // ----------------------------------------------------------------------
  // Rendering
  // ----------------------------------------------------------------------

  renderIntoSubtree() {
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      this.renderChildren(),
      this.element
    );
  }

  renderChildren() {
    const { children, isOpen } = this.props;

    let sizeClass = '';
    if (this.props.size) {
      sizeClass = ` modal-${this.props.size}`;
    }

    const classes = classNames([
      sizeClass,
      'modal-dialog',
    ]);

    return (
      <div>
        {isOpen && (
          <div key="modal-dialog" className="modal" style={{ display: 'block' }} tabIndex="-1">
            <div className={classes} role="document" ref={c => { this.dialog = c; }}>
              <div className="modal-content">
                {children}
              </div>
            </div>
          </div>
        )}
        {isOpen && (
          <div key="modal-backdrop" className="modal-backdrop in" />
        )}
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
