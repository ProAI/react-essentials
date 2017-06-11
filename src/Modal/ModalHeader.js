import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import CloseButton from '../shared/CloseButton';

const propTypes = {
  titleId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onToggle: PropTypes.func.isRequired,
  dismissible: PropTypes.bool.isRequired,
};

const defaultProps = {
  className: null,
};

function ModalHeader({ titleId, className, children, dismissible, onToggle, ...props }) {
  let closeButton;

  const classes = cx(className, 'modal-header');

  if (dismissible) {
    closeButton = <CloseButton onClick={onToggle} />;
  }

  return (
    <div {...props} className={classes}>
      <h4 className="modal-title" id={titleId}>
        {children}
      </h4>
      {closeButton}
    </div>
  );
}

ModalHeader.propTypes = propTypes;
ModalHeader.defaultProps = defaultProps;

export default ModalHeader;
