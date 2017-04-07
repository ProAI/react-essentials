import React, { PropTypes } from 'react';
import cx from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  className: null,
};

function CardHeader({ children, className, ...attributes }) {
  const classes = cx(
    'card-header',
    className,
  );

  return (
    <div {...attributes} className={classes}>
      {children}
    </div>
  );
}

CardHeader.propTypes = propTypes;
CardHeader.defaultProps = defaultProps;

export default CardHeader;
