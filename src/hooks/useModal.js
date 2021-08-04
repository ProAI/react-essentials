import { useState, useRef, useEffect, useMemo } from 'react';
import invariant from 'fbjs/lib/invariant';
import useIdentifier from './useIdentifier';
import useScrollbarEffects from './useScrollbarEffects';

export default function useModal(
  visible,
  setVisible,
  { keepBodyScroll, bodyClass, centered },
) {
  const identifier = useIdentifier('modal');

  const [mounted, setMounted] = useState(false);

  const ref = useRef();

  useEffect(() => {
    setMounted(true);
  }, []);

  useScrollbarEffects({
    modalRef: ref,
    active: mounted && visible,
    keepBodyScroll,
    bodyClass,
    centered,
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
          "Overlay cannot be used with prop 'toggle'. Please use prop 'dismiss' instead.",
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
    [visible, mounted],
  );
}
