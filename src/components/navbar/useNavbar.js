import { useMemo } from 'react';
import useIdentifier from '../../hooks/useIdentifier';
import useControlledState from '../../hooks/useControlledState';

export default function useNavbar(
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
    () => ({
      identifier,
      expanded,
      setExpanded,
      expand,
      trigger: ({ dismiss }) => {
        if (dismiss) {
          return {
            props: {
              onPress: () => {
                setExpanded(false);
              },
            },
          };
        }

        return {
          props: {
            nativeID: identifier,
            onPress: () => {
              setExpanded((value) => !value);
            },
            'aria-controls': identifier,
            'aria-expanded': expanded,
            'aria-label': 'Toggle navigation',
          },
        };
      },
    }),
    [expanded],
  );
}
