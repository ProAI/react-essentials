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

function FormTitle({ children, className, ...attributes }) {
  const classes = cx('form-title', className);

  return (
    <div {...attributes} className={classes}>
      {children}
    </div>
  );
}

FormTitle.propTypes = propTypes;
FormTitle.defaultProps = defaultProps;

export default FormTitle;
