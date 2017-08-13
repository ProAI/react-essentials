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

function Container({ children, className }) {
  const classes = cx('container', className);

  return (
    <div className={classes}>
      {children}
    </div>
  );
}

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
