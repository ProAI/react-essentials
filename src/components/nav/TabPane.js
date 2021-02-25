import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import invariant from 'fbjs/lib/invariant';
import { TabContext } from './TabContainer';
import BaseView from '../../utils/rnw-compat/BaseView';
import useActiveTab from '../../hooks/useActiveTab';

const propTypes = {
  children: PropTypes.node.isRequired,
  tabKey: PropTypes.string,
};

const TabPane = React.forwardRef((props, ref) => {
  const { tabKey, ...elementProps } = props;

  const tabbable = useContext(TabContext);

  invariant(
    tabbable,
    'TabPane can only be used inside a TabContainer component.',
  );

  const activeTabKey = useActiveTab(tabbable);

  // Do not render the content if tab pane is not active.
  if (activeTabKey !== tabKey) {
    return null;
  }

  return (
    <BaseView
      {...elementProps}
      ref={ref}
      id={tabKey}
      accessibilityRole="tabpanel"
      aria-labelledby={`${tabKey}-tab`}
      essentials={{ className: 'tab-pane' }}
    />
  );
});

TabPane.displayName = 'TabPane';
TabPane.propTypes = propTypes;

export default TabPane;
