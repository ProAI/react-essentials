import { useMemo } from 'react';
import cx from 'classnames';
import useIdentifier from '../../hooks/useIdentifier';
import useControlledState from '../../hooks/useControlledState';

export default function useCollapse(
  defaultVisible,
  controlledVisible,
  onToggle,
) {
  const identifier = useIdentifier('collapse');

  const [visible, setVisible] = useControlledState(
    defaultVisible,
    controlledVisible,
    onToggle,
  );

  return useMemo(
    () => ({
      identifier,
      visible,
      setVisible,
      trigger: ({ dismiss }) => {
        if (dismiss) {
          return {
            props: {
              onPress: () => {
                setVisible(false);
              },
            },
          };
        }

        return {
          props: {
            onPress: () => {
              setVisible((value) => !value);
            },
            'aria-expanded': visible,
            'aria-controls': identifier,
          },
          classes: cx(!visible && 'collapsed'),
        };
      },
    }),
    [visible],
  );
}
