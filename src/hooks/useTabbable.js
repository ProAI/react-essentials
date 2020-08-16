import { useContext } from 'react';
import { __RouterContext as RouterContext, matchPath } from 'react-router';
import invariant from 'fbjs/lib/invariant';
import { TabContext } from '../components/nav/TabContainer';
import useAction from './useAction';
import useActiveTab from './useActiveTab';

const determineActive = (location, to, exact, strict) => {
  const path = typeof to === 'object' ? to.pathname : to;

  // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
  const escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');

  const pathToMatch = location.pathname;

  const match = escapedPath
    ? matchPath(pathToMatch, { path: escapedPath, exact, strict })
    : null;

  return !!match;
};

export default function useTabbable(props, ref) {
  const { tabKey, active = null, exact, strict, ...elementProps } = props;
  const { to, external = false } = elementProps;

  const tabbable = useContext(TabContext);

  // Element is a tab.
  if (tabbable && tabKey) {
    invariant(!to, "Prop 'to' is not allowed inside a tab context.");

    const { onPress: handlePress, onClick: handleClick } = elementProps;

    const activeTabKey = useActiveTab(tabbable);

    const activeProp = active === null ? tabKey === activeTabKey : active;

    return {
      ...elementProps,
      href: `#${tabKey}`,
      id: `${tabKey}-tab`,
      accessibiltyRole: 'tab',
      'aria-controls': tabKey,
      'aria-selected': activeProp,
      active: activeProp,
      onClick: event => {
        // Workaround, because preventDefault in onPress does not prevent from
        // adding the hash to the url.
        event.preventDefault();

        if (handleClick) handleClick(event);
      },
      onPress: event => {
        if (handlePress) handlePress(event);

        tabbable.setActiveKey(tabKey);
      },
    };
  }

  const actionProps = useAction(elementProps, ref);

  // Element is a nav link.
  if (!tabbable && to && !external) {
    invariant(!tabKey, "Prop 'tabKey' is not allowed outside a tab context.");

    const { location } = useContext(RouterContext);

    const activeProp =
      active === null ? determineActive(location, to, exact, strict) : active;

    const tabProps = {
      ...actionProps,
      active: activeProp,
    };

    if (activeProp) {
      tabProps['aria-current'] = 'page';
    }

    return tabProps;
  }

  // Element is an external link or button.
  return {
    ...actionProps,
    active: false,
  };
}
