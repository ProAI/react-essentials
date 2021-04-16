import { useMemo } from 'react';
import cx from 'classnames';
import getElementId from '../../utils/getElementId';
import useIdentifier from '../../hooks/useIdentifier';
import useControlledState from '../../hooks/useControlledState';

export default function useCollapseState(
  defaultExpanded,
  controlledExpanded,
  onToggle,
) {
  const identifier = useIdentifier('collapse');

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
            onPress: () => {
              toggle();
            },
            'aria-expanded': expanded,
            'aria-controls': id,
          },
          classes: cx(!expanded && 'collapsed'),
        },
        target: {
          props: {
            nativeID: id,
          },
          classes: cx(expanded && 'show'),
        },
      };
    },
    [expanded],
  );
}
