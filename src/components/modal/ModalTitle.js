import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import invariant from 'fbjs/lib/invariant';
import BaseView from '../../utils/rnw-compat/BaseView';
import ModalContext from './ModalContext';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const ModalTitle = React.forwardRef((props, ref) => {
  const modal = useContext(ModalContext);

  invariant(modal, 'ModalTitle can only be used inside a Modal component.');

  return (
    <BaseView
      {...props}
      ref={ref}
      nativeID={modal.identifier}
      accessibilityRole="heading"
      aria-level={5}
      essentials={{ className: 'modal-title' }}
    />
  );
});

ModalTitle.displayName = 'ModalTitle';
ModalTitle.propTypes = propTypes;

export default ModalTitle;
