import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import findNodeHandle from 'react-native-web/dist/cjs/exports/findNodeHandle';
import ModalContext from './ModalContext';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import ModalTitle from './ModalTitle';
import { MODAL_SIZES } from '../../utils/constants';
import BaseView from '../../utils/rnw-compat/BaseView';
import useModal from '../../hooks/useModal';

const propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
  size: PropTypes.oneOf(MODAL_SIZES),
  backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['static'])]),
  scrollable: PropTypes.bool,
  centered: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
};

const Modal = React.forwardRef((props, ref) => {
  const {
    visible,
    size,
    backdrop = true,
    scrollable = false,
    centered = false,
    onToggle,
    ...elementProps
  } = props;

  const modal = useModal(visible, onToggle, {
    keepBodyScroll: false,
    bodyClass: 'modal-open',
    centered: true,
  });
  const waitingForMouseUp = useRef(false);
  const ignoreBackdropClick = useRef(false);

  // Return null if not mounted.
  if (!modal.mounted || !modal.visible) {
    return null;
  }

  const dialogClasses = cx(
    // constant classes
    'modal-dialog',
    // variable classes
    size === 'sm' && 'modal-sm',
    size === 'lg' && 'modal-lg',
    size === 'xl' && 'modal-xl',
    scrollable && 'modal-dialog-scrollable',
    centered && 'modal-dialog-centered',
  );

  const modalElement = (
    <ModalContext.Provider value={modal} key="modal">
      <BaseView
        ref={(element) => {
          modal.ref.current = findNodeHandle(element);
        }}
        accessible
        accessibilityRole="dialog"
        aria-labelledby={modal.identifier}
        aria-modal="true"
        // For now we need onClick here, because onMouseDown would also toggle the modal when the user clicks on a scrollbar.
        onClick={(event) => {
          if (backdrop === 'static') {
            return;
          }

          if (
            ignoreBackdropClick.current ||
            event.target !== event.currentTarget
          ) {
            ignoreBackdropClick.current = false;
            return;
          }

          modal.setVisible(false);
        }}
        onMouseUp={(event) => {
          if (waitingForMouseUp.current && event.target === modal.ref.current) {
            ignoreBackdropClick.current = true;
          }

          waitingForMouseUp.current = false;
        }}
        onKeyUp={(event) => {
          if (event.key !== 'Escape') {
            return;
          }

          event.preventDefault();

          if (backdrop === 'static') {
            return;
          }

          modal.setVisible(false);
        }}
        essentials={{ className: 'modal show' }}
      >
        <BaseView
          onMouseDown={() => {
            waitingForMouseUp.current = true;
          }}
          essentials={{ className: dialogClasses }}
        >
          <BaseView
            {...elementProps}
            ref={ref}
            essentials={{ className: 'modal-content' }}
          />
        </BaseView>
      </BaseView>
    </ModalContext.Provider>
  );

  if (!backdrop) {
    return ReactDOM.createPortal(modalElement, document.body);
  }

  const backdropElement = (
    <BaseView
      key="modal-backdrop"
      essentials={{ className: 'modal-backdrop show' }}
    />
  );

  return ReactDOM.createPortal([modalElement, backdropElement], document.body);
});

Modal.displayName = 'Modal';
Modal.propTypes = propTypes;

Modal.Context = ModalContext;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;

export default Modal;
