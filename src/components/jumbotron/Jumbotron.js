import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
  fluid: PropTypes.bool,
};

const Jumbotron = React.forwardRef((props, ref) => {
  const { fluid = false, ...elementProps } = props;

  const classes = cx(
    // constant classes
    'jumbotron',
    // variable classes
    fluid && 'jumbotron-fluid',
  );

  return (
    <BaseView {...elementProps} ref={ref} essentials={{ className: classes }} />
  );
});

Jumbotron.displayName = 'Jumbotron';
Jumbotron.propTypes = propTypes;

export default Jumbotron;
