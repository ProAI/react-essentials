import React, { PropTypes } from 'react';
import cx from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

function ModalFooter({ className, children, ...props }) {
  const classes = cx(
    className,
    'modal-footer',
  );

  return (
    <div {...props} className={classes}>
      {children}
    </div>
  );
}

ModalFooter.propTypes = propTypes;

export default ModalFooter;
