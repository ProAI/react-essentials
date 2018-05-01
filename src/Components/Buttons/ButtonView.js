import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { RawButton, propValues } from '../../utils';

const propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(propValues.buttonColors),
  size: PropTypes.oneOf(propValues.sizes),
};

const defaultProps = {
  className: null,
  variant: 'primary',
  size: null,
};

function ButtonView({ variant, size, ...attributes }) {
  const classes = cx(
    'btn',
    `btn-${variant}`,
    { 'btn-sm': size === 'sm' },
    { 'btn-lg': size === 'lg' },
  );

  return <RawButton {...attributes} className={classes} />;
}

ButtonView.propTypes = propTypes;
ButtonView.defaultProps = defaultProps;

export default ButtonView;
