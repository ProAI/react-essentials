import React, { PropTypes } from 'react';
import cx from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

function Card({ children, className, ...attributes }) {
  const classes = cx(
    'card',
    className,
  );

  return (
    <div {...attributes} className={classes}>
      {children}
    </div>
  );
}

Card.propTypes = propTypes;

export default Card;
