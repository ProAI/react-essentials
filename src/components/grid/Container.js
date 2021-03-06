import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
  fluid: PropTypes.bool,
};

const Container = React.forwardRef((props, ref) => {
  const { fluid = false, ...elementProps } = props;

  const classes = cx(
    // constant classes
    'container',
    // variable classes
    fluid ? 'container-fluid' : null,
  );

  return (
    <BaseView {...elementProps} ref={ref} essentials={{ className: classes }} />
  );
});

Container.displayName = 'Container';
Container.propTypes = propTypes;

export default Container;
