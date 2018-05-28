import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function ButtonGroup({ children, ...elementProps }) {
  return (
    <BaseView props={elementProps} role="group" className="btn-group">
      {children}
    </BaseView>
  );
}

ButtonGroup.propTypes = propTypes;

export default ButtonGroup;
