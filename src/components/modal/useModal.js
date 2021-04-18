import { useState, useRef, useEffect, useMemo } from 'react';
import invariant from 'fbjs/lib/invariant';
import useIdentifier from '../../hooks/useIdentifier';
import useModalEffects from './useModalEffects';

export default function useModal(visible, setVisible) {
  const identifier = useIdentifier('modal');

  const [mounted, setMounted] = useState(false);

  const ref = useRef();

  useEffect(() => {
    setMounted(true);
  }, []);

  useModalEffects({
    modalRef: ref,
    active: mounted && visible,
  });

  return useMemo(
    () => ({
      identifier,
      visible,
      setVisible,
      mounted,
      ref,
      trigger: ({ dismiss }) => {
        invariant(
          dismiss,
          "Modal/ModalContext cannot be used with prop 'toggle'. Please use prop 'dismiss' instead.",
        );

        return {
          props: {
            onPress: () => {
              setVisible(false);
            },
          },
        };
      },
    }),
    [visible],
  );
}
