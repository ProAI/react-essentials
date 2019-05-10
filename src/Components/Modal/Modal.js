import React from 'react';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';
import { findNodeHandle } from 'react-native-web';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import ModalTitle from './ModalTitle';
import { MODAL_SIZES } from '../../utils/constants';
import withForwardedRef from '../../utils/withForwardedRef';
import BaseView from '../../utils/rnw-compat/BaseView';
import Context from '../../Context';

const { canUseDOM } = ExecutionEnvironment;

const propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
  size: PropTypes.oneOf(MODAL_SIZES),
  onToggle: PropTypes.func.isRequired,
  onEnter: PropTypes.func,
  onExit: PropTypes.func,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

const defaultProps = {
  size: null,
  onEnter: null,
  onExit: null,
  innerRef: null,
};

const computeScrollbarWidth = () => {
  const scrollDiv = document.createElement('div');
  scrollDiv.className = 'modal-scrollbar-measure';
  document.body.appendChild(scrollDiv);

  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

  document.body.removeChild(scrollDiv);

  return scrollbarWidth;
};

/* eslint-disable react/sort-comp */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
class Modal extends React.Component {
  static contextType = Context;

  constructor(props, context) {
    super(props, context);

    this.container = canUseDOM ? document.createElement('div') : null;

    this.identifier = context.generateKey('re-modal-');
  }

  componentDidMount() {
    const { visible } = this.props;

    if (visible) {
      this.show();
    }
  }

  componentDidUpdate(prevProps) {
    const { visible } = this.props;

    if (visible !== prevProps.visible) {
      if (visible) {
        this.show();
      } else {
        this.hide();
      }
    }
  }

  componentWillUnmount() {
    const { visible } = this.props;

    if (visible) {
      this.hide();
    }
  }

  show() {
    const { onEnter } = this.props;
    if (onEnter) onEnter();

    this._analyzeScrollbar();

    this._setScrollbar();

    // append container to body
    document.body.appendChild(this.container);

    // add modal-open class to body tag
    const classes = document.body.className;
    document.body.className = cx(classes, 'modal-open');

    // focus container
    this.container.focus();
    window.scrollTo(window.scrollX, window.scrollY); // ???

    this._addScrollbarReplacement();

    // add keyup event listener to support ESC key
    document.addEventListener('keyup', this.handleKeyUp);
  }

  _analyzeScrollbar() {
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

  _setScrollbar() {
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

  _addScrollbarReplacement() {
    const dialog = findNodeHandle(this.dialog);

    const isModalOverflowing =
      dialog.scrollHeight > document.documentElement.clientHeight;

    if (!this.isBodyOverflowing && isModalOverflowing) {
      dialog.style.paddingLeft = `${this.scrollbarWidth}px`;
    }

    if (this.isBodyOverflowing && !isModalOverflowing) {
      dialog.style.paddingRight = `${this.scrollbarWidth}px`;
    }
  }

  hide() {
    const { onExit } = this.props;
    if (onExit) onExit();

    // remove keyup event listener
    document.removeEventListener('keyup', this.handleKeyUp);

    this._unsetScrollbar();

    document.body.removeChild(this.container);
    // this.container = null;

    // remove modal-open class from body tag
    const classes = document.body.className.replace('modal-open', '');
    document.body.className = cx(classes).trim();
  }

  _unsetScrollbar() {
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
      innerRef,
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
        <BaseView
          tabIndex="-1"
          accessibilityRole="dialog"
          aria-labelledby={this.identifier}
          aria-hidden={!visible}
          onClick={this.handleBackdropClick}
          essentials={{ className: modalClasses }}
        >
          <BaseView
            role="document"
            ref={dialog => {
              this.dialog = dialog;
            }}
            essentials={{ className: modalDialogClasses }}
          >
            <BaseView
              {...elementProps}
              ref={innerRef}
              essentials={{ className: 'modal-content' }}
            >
              {manipulatedChildren}
            </BaseView>
          </BaseView>
        </BaseView>
        <BaseView essentials={{ className: modalBackdropClasses }} />
      </React.Fragment>
    );
  }

  handleKeyUp = event => {
    const { onToggle } = this.props;

    if (event.key === 'Escape') {
      onToggle();
    }
  };

  handleBackdropClick = event => {
    const { onToggle } = this.props;

    const dialog = findNodeHandle(this.dialog);

    if (event.target && !dialog.contains(event.target)) {
      onToggle();
    }
  };

  render() {
    const { visible } = this.props;

    // prevent modal on the server, because ssr does not support portals yet
    if (!canUseDOM || !visible) {
      return null;
    }

    return ReactDOM.createPortal(this.renderModal(), this.container);
  }
}
/* eslint-enable */

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;

export default withForwardedRef(Modal, ['Body', 'Footer', 'Header', 'Title']);
