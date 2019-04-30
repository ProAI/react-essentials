import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function ButtonToolbar(elementProps) {
  return <BaseView {...elementProps} accessibilityRole="toolbar" />;
}

ButtonToolbar.propTypes = propTypes;

export default ButtonToolbar;
