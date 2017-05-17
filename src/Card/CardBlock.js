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

function CardBlock({ children, className, ...attributes }) {
  const classes = cx('card-block', className);

  return (
    <div {...attributes} className={classes}>
      {children}
    </div>
  );
}

CardBlock.propTypes = propTypes;
CardBlock.defaultProps = defaultProps;

export default CardBlock;
