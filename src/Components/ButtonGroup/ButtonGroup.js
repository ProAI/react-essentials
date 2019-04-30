import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function ButtonGroup(elementProps) {
  return (
    <BaseView
      {...elementProps}
      accessibilityRole="group"
      essentials={{ className: 'btn-group' }}
    />
  );
}

ButtonGroup.propTypes = propTypes;

export default ButtonGroup;
