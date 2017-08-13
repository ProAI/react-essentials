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

function Row({ children, className }) {
  const classes = cx('row', className);

  return (
    <div className={classes}>
      {children}
    </div>
  );
}

Row.propTypes = propTypes;
Row.defaultProps = defaultProps;

export default Row;
