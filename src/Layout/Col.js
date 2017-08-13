// @flow
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.number.isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  className: null,
};

function Col({ children, size, className }) {
  const classes = cx('col-12', `col-md-${size}`, className);

  return (
    <div className={classes}>
      {children}
    </div>
  );
}

Col.propTypes = propTypes;
Col.defaultProps = defaultProps;

export default Col;
