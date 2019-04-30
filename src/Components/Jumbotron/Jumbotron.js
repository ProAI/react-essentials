import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
  fluid: PropTypes.bool,
};

const defaultProps = {
  fluid: false,
};

function Jumbotron({ fluid, ...elementProps }) {
  const classes = cx(
    // constant classes
    'jumbotron',
    // variable classes
    fluid && 'jumbotron-fluid',
  );

  return <BaseView {...elementProps} essentials={{ className: classes }} />;
}

Jumbotron.propTypes = propTypes;
Jumbotron.defaultProps = defaultProps;

export default Jumbotron;
