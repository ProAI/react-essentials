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

const TabsContentPane = React.forwardRef(function TabsContentPane(props, ref) {
  const { active, ...elementProps } = props;

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
TabsContentPane.defaultProps = defaultProps;

export default TabsContentPane;
