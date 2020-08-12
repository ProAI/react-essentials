import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
  defaultActiveTabKey: PropTypes.string.isRequired,
};

export const TabContext = createContext();

const TabContainer = React.forwardRef(function TabContent(props, ref) {
  const { defaultActiveTabKey, ...elementProps } = props;

  const [activeKey, setActiveKey] = useState(defaultActiveTabKey);

  return (
    <TabContext.Provider value={{ activeKey, setActiveKey }}>
      <BaseView {...elementProps} ref={ref} />
    </TabContext.Provider>
  );
});

TabContainer.displayName = 'TabContainer';
TabContainer.propTypes = propTypes;

export default TabContainer;
