import { useMemo } from 'react';
import cx from 'classnames';
import invariant from 'fbjs/lib/invariant';
import getElementId from '../../utils/getElementId';
import useIdentifier from '../../hooks/useIdentifier';
import useControlledState from '../../hooks/useControlledState';

export default function useTabbable(
  defaultActiveTarget,
  controlledActiveTarget,
  onChange,
) {
  const identifier = useIdentifier('tabbable');

  const [activeTarget, setActiveTarget] = useControlledState(
    defaultActiveTarget,
    controlledActiveTarget,
    onChange,
  );

  return useMemo(
    () => ({
      identifier,
      activeTarget,
      setActiveTarget,
      trigger: ({ target, dismiss }) => {
        invariant(
          !dismiss,
          "Tab/TabContext cannot be used with prop 'dismiss'. Please use prop 'toggle' instead.",
        );

        const id = getElementId(identifier, target);
        const active = activeTarget === target;

        return {
          props: {
            nativeID: `${id}-tab`,
            onPress: (event) => {
              event.preventDefault();

              setActiveTarget(target);
            },
            accessibiltyRole: 'tab',
            'aria-controls': id,
            'aria-selected': active,
          },
          classes: cx(active && 'active'),
        };
      },
    }),
    [activeTarget],
  );
}
