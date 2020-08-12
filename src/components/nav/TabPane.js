import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { TabContext } from './TabContainer';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
  tabKey: PropTypes.string,
};

const TabPane = React.forwardRef(function TabPane(props, ref) {
  const { tabKey, ...elementProps } = props;

  const tabbable = useContext(TabContext);

  const active = tabbable.activeKey === tabKey;

  const classes = cx(
    // constant classes
    'tab-pane',
    // variable classes
    active && 'active',
  );

  return (
    <BaseView
      {...elementProps}
      ref={ref}
      id={tabKey}
      accessibilityRole="tabpanel"
      aria-labelledby={`${tabKey}-tab`}
      essentials={{ className: classes }}
    />
  );
});

TabPane.displayName = 'TabPane';
TabPane.propTypes = propTypes;

export default TabPane;
