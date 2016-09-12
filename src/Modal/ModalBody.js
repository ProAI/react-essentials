import React, { PropTypes } from 'react';
import cx from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

function ModalBody({ className, children, ...props }) {
  const classes = cx(
    className,
    'modal-body',
  );

  return (
    <div {...props} className={classes}>
      {children}
    </div>
  );
}

ModalBody.propTypes = propTypes;

export default ModalBody;
