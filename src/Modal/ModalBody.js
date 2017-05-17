import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  className: null,
};

function ModalBody({ className, children, ...props }) {
  const classes = cx(className, 'modal-body');

  return (
    <div {...props} className={classes}>
      {children}
    </div>
  );
}

ModalBody.propTypes = propTypes;
ModalBody.defaultProps = defaultProps;

export default ModalBody;
