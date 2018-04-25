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

function CardSubtitle({ children, className, ...attributes }) {
  const classes = cx('card-subtitle', className);

  return (
    <h6 {...attributes} className={classes}>
      {children}
    </h6>
  );
}

CardSubtitle.propTypes = propTypes;
CardSubtitle.defaultProps = defaultProps;

export default CardSubtitle;
