// @flow
import { useState, useEffect } from 'react';

export default function useActiveTab(tabbable) {
  const [activeKey, setActiveKey] = useState(tabbable.activeKey);

  useEffect(() => {
    const unsubscribe = tabbable.subscribe(key => {
      setActiveKey(key);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return activeKey;
}
