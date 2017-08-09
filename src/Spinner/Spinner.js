import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';

const propTypes = {
  variant: PropTypes.oneOf([
    'balls',
    'bars',
    'bubbles',
    'cubes',
    'cylon',
    'spin',
    'spinningBubbles',
    'spokes',
  ]),
  delay: PropTypes.number,
};

const defaultProps = {
  variant: 'spin',
  delay: 0,
};

function Spinner({ variant, delay, ...props }) {
  return <ReactLoading type={variant} delay={delay} {...props} />;
}

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export default Spinner;
