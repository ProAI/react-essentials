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

function Card({ children, className, ...attributes }) {
  const classes = cx('card', className);

  return (
    <div {...attributes} className={classes}>
      {children}
    </div>
  );
}

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
