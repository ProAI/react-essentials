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
      const id = getElementId(identifier, name);
      const toggle = () => {
        setExpanded((value) => !value);
      };

      return {
        active: expanded,
        toggle,
        trigger: {
          props: {
            nativeID: id,
            onPress: () => {
              toggle();
            },
            'aria-controls': id,
            'aria-expanded': expanded,
            'aria-label': 'Toggle navigation',
          },
        },
        target: {
          props: {
            'aria-labelledby': id,
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
