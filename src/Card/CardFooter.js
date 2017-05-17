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

function CardFooter({ children, className, ...attributes }) {
  const classes = cx('card-footer', className);

  return (
    <div {...attributes} className={classes}>
      {children}
    </div>
  );
}

CardFooter.propTypes = propTypes;
CardFooter.defaultProps = defaultProps;

export default CardFooter;
