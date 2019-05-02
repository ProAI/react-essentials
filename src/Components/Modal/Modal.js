import React from 'react';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import { findNodeHandle } from 'react-native-web';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import ModalTitle from './ModalTitle';
import { MODAL_SIZES } from '../../utils/constants';
import BaseView from '../../utils/rnw-compat/BaseView';
import Context from '../../Context';

const propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
  size: PropTypes.oneOf(MODAL_SIZES),
  onToggle: PropTypes.func.isRequired,
  onEnter: PropTypes.func,
  onExit: PropTypes.func,
};

const defaultProps = {
  size: null,
  onEnter: null,
  onExit: null,
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
  static contextType = Context;

  constructor(props, context) {
    super(props, context);

    this.identifier = context.generateKey('re-modal-');
  }

  componentWillMount() {
    // prevent modal on the server, because ssr does not support portals yet
    if (!canUseDOM) return;

    this.onEnter();

    const { props } = this;

    if (props.visible) {
      this.beforeShow();
    }
  }

  componentDidMount() {
    const { props } = this;

    if (props.visible) {
      this.afterShow();
    }
  }

  componentWillUpdate(nextProps) {
    const { props } = this;

    if (props.visible !== nextProps.visible) {
      if (nextProps.visible) {
        this.beforeShow();
      } else {
        this.beforeHide();
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { props } = this;

    if (props.visible !== prevProps.visible) {
      if (props.visible) {
        this.afterShow();
      } else {
        this.afterHide();
      }
    }
  }

  componentWillUnmount() {
    const { props } = this;

    if (props.visible) {
      this.beforeHide();
      this.afterHide();
    }
  }

  onEnter = () => {
    const { props } = this;

    if (props.onEnter) {
      props.onEnter();
    }
  };

  onExit = () => {
    this.destroy();

    const { props } = this;

    if (props.onExit) {
      props.onExit();
    }
  };

  onEscape = ev => {
    const { props } = this;

    if (ev.key === 'Escape') {
      props.onToggle();
    }
  };

  onBackdropClick = ev => {
    const container = findNodeHandle(this.dialog);
    const { onToggle } = this.props;

    if (ev.target && !container.contains(ev.target)) {
      onToggle();
    }
  };

  destroy = () => {
    const classes = document.body.className.replace('modal-open', '');
    this.removeEvents();

    if (this.container) {
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
    const container = findNodeHandle(this.dialog);
    const isModalOverflowing =
      container.scrollHeight > document.documentElement.clientHeight;

    if (!this.isBodyOverflowing && isModalOverflowing) {
      container.style.paddingLeft = `${this.scrollbarWidth}px`;
    }

    if (this.isBodyOverflowing && !isModalOverflowing) {
      container.style.paddingRight = `${this.scrollbarWidth}px`;
    }
  }

  resetAdjustments() {
    const container = findNodeHandle(this.dialog);

    container.style.paddingLeft = '';
    container.style.paddingRight = '';
  }

  checkScrollbar() {
    let fullWindowWidth = window.innerWidth;
    if (!fullWindowWidth) {
      // workaround for missing window.innerWidth in IE8
      const documentElementRect = document.documentElement.getBoundingClientRect();
      fullWindowWidth =
        documentElementRect.right - Math.abs(documentElementRect.left);
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
      if (document.getElementsByClassName('navbar')[0]) {
        document.getElementsByClassName(
          'navbar',
        )[0].style.paddingRight = `${bodyPadding + this.scrollbarWidth}px`;
      }
    }
  }

  resetScrollbar() {
    if (document.getElementById('content')) {
      document.getElementById(
        'content',
      ).style.paddingRight = this.originalBodyPadding;
    }
    if (document.getElementsByClassName('navbar')[0]) {
      document.getElementsByClassName(
        'navbar',
      )[0].style.paddingRight = this.originalBodyPadding;
    }
  }

  renderModal() {
    const {
      children,
      visible,
      size,
      onToggle,
      onEnter,
      onExit,
      ...elementProps
    } = this.props;

    const modalClasses = cx(
      // constant classes
      'modal',
      // variable classes
      visible && 'show',
    );

    const modalDialogClasses = cx(
      // constant classes
      'modal-dialog',
      // variable classes
      size === 'sm' && 'modal-sm',
      size === 'lg' && 'modal-lg',
    );

    const modalBackdropClasses = cx(
      // constant classes
      'modal-backdrop',
      // variable classes
      visible && 'show',
    );

    const manipulatedChildren = React.Children.map(children, (child, i) => {
      // inject titleId props for aria support
      if (i === 0) {
        return React.cloneElement(child, {
          titleId: this.identifier,
        });
      }

      return child;
    });

    return (
      <React.Fragment>
        <div
          className={modalClasses}
          tabIndex="-1"
          role="dialog"
          aria-labelledby={this.identifier}
          aria-hidden={!visible}
        >
          <div
            className={modalDialogClasses}
            role="document"
            ref={c => {
              this.dialog = c;
            }}
          >
            <BaseView
              {...elementProps}
              essentials={{ className: 'modal-content' }}
            >
              {manipulatedChildren}
            </BaseView>
          </div>
        </div>
        <div key="modal-backdrop" className={modalBackdropClasses} />
      </React.Fragment>
    );
  }

  render() {
    const { visible } = this.props;

    // prevent modal on the server, because ssr does not support portals yet
    if (!canUseDOM) return null;

    // see componentDidMount and componentDidUpdate for React 15 rendering
    if (!visible) {
      return null;
    }

    return ReactDOM.createPortal(this.renderModal(), this.container);
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;

export default Modal;
