import { useMemo } from 'react';
import cx from 'classnames';
import getElementId from '../../utils/getElementId';
import useIdentifier from '../../hooks/useIdentifier';
import useControlledState from '../../hooks/useControlledState';

export default function useNavbarState(
  defaultExpanded,
  controlledExpanded,
  onToggle,
  expand,
) {
  const identifier = useIdentifier('navbar');

  const [expanded, setExpanded] = useControlledState(
    defaultExpanded,
    controlledExpanded,
    onToggle,
  );

  return useMemo(
    () => (name) => {
      const target = getElementId(identifier, name);
      const toggle = () => {
        setExpanded((value) => !value);
      };

      return {
        active: expanded,
        toggle,
        trigger: {
          props: {
            id: target,
            onPress: () => {
              toggle();
            },
            'aria-controls': target,
            'aria-expanded': expanded,
            'aria-label': 'Toggle navigation',
          },
        },
        target: {
          props: {
            'aria-labelledby': target,
          },
          classes: cx(expanded && 'show'),
        },
        extra: {
          expand,
        },
      };
    },
    [expanded],
  );
}
