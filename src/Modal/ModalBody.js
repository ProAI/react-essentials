import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

function ModalBody({ className, children, ...props }) {
  const classes = classNames([
    className,
    'modal-body',
  ]);

  return (
    <div {...props} className={classes}>
      {children}
    </div>
  );
}

ModalBody.propTypes = propTypes;

export default ModalBody;
