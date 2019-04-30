import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseView from '../../utils/rnw-compat/BaseView';
import { PAGE_SECTIONS } from '../../utils/constants';

const propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(PAGE_SECTIONS),
  fluid: PropTypes.bool,
};

const defaultProps = {
  variant: null,
  fluid: false,
};

function Container({ variant, fluid, ...elementProps }) {
  const classes = cx(
    // constant classes
    'container',
    // variable classes
    fluid ? 'container-fluid' : null,
  );

  return (
    <BaseView
      {...elementProps}
      essentials={{ tag: variant || 'div', className: classes }}
    />
  );
}

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
