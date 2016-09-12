import React, { PropTypes } from 'react';
import cx from 'classnames';
import CloseButton from '../shared/CloseButton';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  toggle: PropTypes.func,
};

const contextTypes = {
  toggle: PropTypes.func.isRequired,
  dismissible: PropTypes.bool.isRequired,
};

function ModalHeader({ className, children, ...props }, { dismissible, toggle }) {
  let closeButton;

  const classes = cx(
    className,
    'modal-header',
  );

  if (dismissible) {
    closeButton = (
      <CloseButton onClick={toggle} />
    );
  }

  return (
    <div {...props} className={classes}>
      {closeButton}
      <h4 className="modal-title">
        {children}
      </h4>
    </div>
  );
}

ModalHeader.propTypes = propTypes;
ModalHeader.contextTypes = contextTypes;

export default ModalHeader;
