import React, { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
  defaultActiveTabKey: PropTypes.string.isRequired,
};

export const TabContext = createContext();

const TabContainer = React.forwardRef((props, ref) => {
  const { defaultActiveTabKey, ...elementProps } = props;

  const context = useMemo(() => {
    const listeners = [];
    let activeKey = defaultActiveTabKey;

    const setActiveKey = (key) => {
      activeKey = key;

      listeners.forEach((listener) => {
        listener(activeKey);
      });
    };

    const subscribe = (listener) => {
      listeners.push(listener);

      const unsubscribe = () => {
        const index = listeners.indexOf(listener);
        listeners.splice(index, 1);
      };

      return unsubscribe;
    };

    return {
      activeKey,
      setActiveKey,
      subscribe,
    };
  }, []);

  return (
    <TabContext.Provider value={context}>
      <BaseView {...elementProps} ref={ref} essentials={{}} />
    </TabContext.Provider>
  );
});

TabContainer.displayName = 'TabContainer';
TabContainer.propTypes = propTypes;

export default TabContainer;
