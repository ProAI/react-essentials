import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseView } from '../../utils/components';
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

function Container({ children, variant, fluid, ...elementProps }) {
  const classes = cx(
    // constant classes
    'container',
    // variable classes
    fluid ? 'container-fluid' : null,
  );

  return (
    <BaseView tag={variant || 'div'} props={elementProps} className={classes}>
      {children}
    </BaseView>
  );
}

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
