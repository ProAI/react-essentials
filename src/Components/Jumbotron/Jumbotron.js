import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseView } from '../../utils/components';

const propTypes = {
  fluid: PropTypes.bool,
};

const defaultProps = {
  fluid: false,
};

function Jumbotron({ fluid, ...otherProps }) {
  const classes = cx(
    // constant classes
    'jumbotron',
    // variable classes
    fluid && 'jumbotron-fluid',
  );

  return <BaseView {...otherProps} className={classes} />;
}

Jumbotron.propTypes = propTypes;
Jumbotron.defaultProps = defaultProps;

export default Jumbotron;
