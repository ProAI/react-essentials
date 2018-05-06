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

function Container({ fluid, ...elementProps }) {
  const classes = cx(
    // constant classes
    'container',
    // variable classes
    fluid ? 'container-fluid' : null,
  );

  return <BaseView props={elementProps} className={classes} />;
}

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
