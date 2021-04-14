import { useRef, useMemo } from 'react';
import cx from 'classnames';
import findNodeHandle from 'react-native-web/dist/cjs/exports/findNodeHandle';
import getElementId from '../../utils/getElementId';
import useIdentifier from '../../hooks/useIdentifier';
import useOutsidePress from '../../hooks/useOutsidePress';
import useControlledState from '../../hooks/useControlledState';

export default function useDropdownState(
  defaultVisible,
  controlledVisible,
  onToggle,
) {
  const identifier = useIdentifier('dropdown');

  const control = useRef();
  const menu = useRef();

  const [visible, setVisible] = useControlledState(
    defaultVisible,
    controlledVisible,
    onToggle,
  );

  useOutsidePress({
    insideRefs: [control, menu],
    active: visible,
    onPress: () => {
      setVisible(false);
    },
  });

  return useMemo(
    () => (name) => {
      const target = getElementId(identifier, name);
      const toggle = () => {
        setVisible((value) => !value);
      };

      return {
        active: visible,
        toggle,
        trigger: {
          props: {
            id: target,
            ref: (element) => {
              control.current = findNodeHandle(element);
            },
            onPress: () => {
              toggle();
            },
            'aria-haspopup': true,
            'aria-expanded': visible,
          },
        },
        target: {
          props: {
            ref: (element) => {
              menu.current = findNodeHandle(element);
            },
            'aria-labelledby': target,
          },
          classes: cx(visible && 'show'),
        },
      };
    },
    [visible],
  );
}
