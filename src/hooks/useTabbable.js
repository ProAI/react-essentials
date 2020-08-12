import { useContext } from 'react';
import { __RouterContext as RouterContext, matchPath } from 'react-router';
import invariant from 'fbjs/lib/invariant';
import { TabContext } from '../components/nav/TabContainer';
import useAction, { applyDisabled } from './useAction';

export default function useTabbable(props, ref) {
  const { tabKey, location, isActive, exact, strict, ...elementProps } = props;
  const { to, external = false } = elementProps;

  const tabbable = useContext(TabContext);

  // Element is a tab.
  if (tabbable && tabKey) {
    invariant(!to, "Prop 'to' is not allowed inside a tab context.");

    const { onPress: handlePress } = elementProps;

    const active = tabKey === tabbable.activeKey;

    return applyDisabled({
      ...elementProps,
      id: `${tabKey}-tab`,
      accessibiltyRole: 'tab',
      'aria-controls': tabKey,
      'aria-selected': active,
      active,
      onPress: event => {
        if (handlePress) handlePress(event);

        tabbable.setActiveKey(tabKey);
      },
    });
  }

  const actionProps = useAction(elementProps, ref);

  // Element is a nav link.
  if (!tabbable && to && !external) {
    invariant(!tabKey, "Prop 'tabKey' is not allowed outside a tab context.");

    const router = useContext(RouterContext);

    const path = typeof to === 'object' ? to.pathname : to;

    // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
    const escapedPath =
      path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');

    const pathToMatch = location ? location.pathname : router.location.pathname;

    const match = escapedPath
      ? matchPath(pathToMatch, { path: escapedPath, exact, strict })
      : null;

    const active = !!(isActive ? isActive(match, router.location) : match);

    const tabProps = {
      ...actionProps,
      active,
    };

    if (active) {
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
