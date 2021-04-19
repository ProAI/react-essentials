import { useRef, useMemo } from 'react';
import findNodeHandle from 'react-native-web/dist/cjs/exports/findNodeHandle';
import useIdentifier from '../../hooks/useIdentifier';
import useOutsidePress from '../../hooks/useOutsidePress';
import useControlledState from '../../hooks/useControlledState';

export default function useDropdown(
  defaultVisible,
  controlledVisible,
  onToggle,
) {
  const identifier = useIdentifier('dropdown');

  const controlRef = useRef();
  const menuRef = useRef();

  const [visible, setVisible] = useControlledState(
    defaultVisible,
    controlledVisible,
    onToggle,
  );

  useOutsidePress({
    insideRefs: [controlRef, menuRef],
    active: visible,
    onPress: () => {
      setVisible(false);
    },
  });

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
            nativeID: identifier,
            ref: (element) => {
              controlRef.current = findNodeHandle(element);
            },
            onPress: () => {
              setVisible((value) => !value);
            },
            'aria-haspopup': true,
            'aria-expanded': visible,
          },
        };
      },
      menuRef: (element) => {
        menuRef.current = findNodeHandle(element);
      },
    }),
    [visible],
  );
}
