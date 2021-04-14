import { useMemo } from 'react';
import cx from 'classnames';
import getElementId from '../../utils/getElementId';
import useIdentifier from '../../hooks/useIdentifier';
import useControlledState from '../../hooks/useControlledState';

export default function useTabbableState(
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
    () => (name) => {
      const target = getElementId(identifier, name);
      const active = activeTarget === target;
      const toggle = () => {
        setActiveTarget(target);
      };

      return {
        active,
        toggle,
        trigger: {
          props: {
            id: `${target}-tab`,
            onPress: () => {
              toggle();
            },
            accessibiltyRole: 'tab',
            'aria-controls': target,
            'aria-selected': active,
          },
          classes: cx(active && 'active'),
        },
        target: {
          props: {
            id: target,
            accessibiltyRole: 'tabpanel',
            'aria-labelledby': `${target}-tab`,
          },
          classes: cx(active && 'active'),
        },
      };
    },
    [activeTarget],
  );
}
