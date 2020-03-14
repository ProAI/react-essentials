import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const TabsContentPane = React.forwardRef(function TabsContentPane(props, ref) {
  const { ...elementProps } = props;

  return (
    <BaseView
      {...elementProps}
      ref={ref}
      accessibilityRole="tabpanel"
      essentials={{ className: 'tab-pane' }}
    />
  );
});

TabsContentPane.displayName = 'TabsContentPane';
TabsContentPane.propTypes = propTypes;

export default TabsContentPane;
