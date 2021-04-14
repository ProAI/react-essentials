import React from 'react';
import PropTypes from 'prop-types';
import TabContext from './TabContext';
import useTabbableState from './useTabbableState';

const propTypes = {
  children: PropTypes.node.isRequired,
  defaultActiveTarget: PropTypes.string.isRequired,
  activeTarget: PropTypes.string,
  onChange: PropTypes.func,
};

const TabProvider = (props) => {
  const { children, defaultActiveTarget, activeTarget, onChange } = props;

  const state = useTabbableState(defaultActiveTarget, activeTarget, onChange);

  return <TabContext.Provider value={state}>{children}</TabContext.Provider>;
};

TabProvider.displayName = 'TabProvider';
TabProvider.propTypes = propTypes;

export default TabProvider;
