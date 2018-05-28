import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function ButtonToolbar({ children, ...elementProps }) {
  return (
    <BaseView props={elementProps} role="toolbar" className="btn-toolbar">
      {children}
    </BaseView>
  );
}

ButtonToolbar.propTypes = propTypes;

export default ButtonToolbar;
