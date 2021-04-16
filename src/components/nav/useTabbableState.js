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
    () => (target) => {
      const id = getElementId(identifier, target);
      const active = activeTarget === target;
      const toggle = () => {
        setActiveTarget(target);
      };

      return {
        active,
        toggle,
        trigger: {
          props: {
            id: `${id}-tab`,
            onPress: () => {
              toggle();
            },
            accessibiltyRole: 'tab',
            'aria-controls': id,
            'aria-selected': active,
          },
          classes: cx(active && 'active'),
        },
        target: {
          props: {
            nativeID: id,
            accessibiltyRole: 'tabpanel',
            'aria-labelledby': `${id}-tab`,
          },
          classes: cx(active && 'show active'),
        },
      };
    },
    [activeTarget],
  );
}
