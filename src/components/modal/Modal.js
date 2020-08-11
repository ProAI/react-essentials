import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import findNodeHandle from 'react-native-web/dist/cjs/exports/findNodeHandle';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import ModalTitle from './ModalTitle';
import { MODAL_SIZES } from '../../utils/constants';
import BaseView from '../../utils/rnw-compat/BaseView';
import useIdentifier from '../../hooks/useIdentifier';
import useModalEffects from './useModalEffects';

const propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
  size: PropTypes.oneOf(MODAL_SIZES),
  scrollable: PropTypes.bool,
  centered: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
};

const Modal = React.forwardRef(function Modal(props, ref) {
  const {
    children,
    visible: isModalOpen,
    size,
    scrollable = false,
    centered = false,
    onToggle = () => {},
    ...elementProps
  } = props;

  const identifier = useIdentifier('modal');
  const [mounted, setMounted] = useState(false);

  const modal = useRef();

  useEffect(() => {
    setMounted(true);
  }, []);

  useModalEffects({
    ref: modal,
    active: mounted && isModalOpen,
  });

  // Return null if not mounted or not open.
  if (!mounted || !isModalOpen) {
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

  const clonedChildren = React.Children.map(children, (child, i) => {
    if (i > 0) {
      return child;
    }

    return React.cloneElement(child, { titleId: identifier });
  });

  const modalElement = (
    <BaseView
      key="modal"
      ref={element => {
        modal.current = findNodeHandle(element);
      }}
      accessible
      accessibilityRole="dialog"
      aria-labelledby={identifier}
      aria-modal="true"
      onMouseDown={event => {
        if (event.target === modal.current) {
          onToggle();
        }
      }}
      onKeyUp={event => {
        if (event.key === 'Escape') {
          event.preventDefault();

          onToggle();
        }
      }}
      essentials={{ className: 'modal show' }}
    >
      <BaseView
        accessibilityRole="document"
        essentials={{ className: dialogClasses }}
      >
        <BaseView
          {...elementProps}
          ref={ref}
          essentials={{ className: 'modal-content' }}
        >
          {clonedChildren}
        </BaseView>
      </BaseView>
    </BaseView>
  );

  const backdropElement = (
    <BaseView
      key="modal-backdrop"
      essentials={{ className: 'modal-backdrop show' }}
    />
  );

  return ReactDOM.createPortal([modalElement, backdropElement], document.body);
});

Modal.propTypes = propTypes;

Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;

export default Modal;
