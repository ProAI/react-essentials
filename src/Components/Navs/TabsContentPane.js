import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
};

const defaultProps = {
  active: false,
};

function TabsContentPane({ active, ...elementProps }) {
  return (
    <BaseView
      {...elementProps}
      accessibilityRole="tabpanel"
      essentials={{ className: 'tab-pane' }}
    />
  );
}

TabsContentPane.propTypes = propTypes;
TabsContentPane.defaultProps = defaultProps;

export default TabsContentPane;
