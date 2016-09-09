import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

function ModalFooter({ className, children, ...props }) {
  const classes = classNames([
    className,
    'modal-footer',
  ]);

  return (
    <div {...props} className={classes}>
      {children}
    </div>
  );
}

ModalFooter.propTypes = propTypes;

export default ModalFooter;
