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

function CardBody({ children, className, ...attributes }) {
  const classes = cx('card-body', className);

  return (
    <div {...attributes} className={classes}>
      {children}
    </div>
  );
}

CardBody.propTypes = propTypes;
CardBody.defaultProps = defaultProps;

export default CardBody;
