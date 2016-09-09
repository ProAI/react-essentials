import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

function CardFooter({ children, className, ...attributes }) {
  const classes = classNames([
    'card-footer',
    className,
  ]);

  return (
    <div {...attributes} className={classes}>
      {children}
    </div>
  );
}

CardFooter.propTypes = propTypes;

export default CardFooter;
