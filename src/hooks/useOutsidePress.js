import { useEffect } from 'react';

export default function useOutsidePress({ insideRefs, active, onPress }) {
  useEffect(() => {
    if (!active) {
      return undefined;
    }

    const onDocumentMouseDown = ({ target }) => {
      const isOutsidePress = !insideRefs.some(
        ref => target === ref.current || ref.current.contains(target),
      );

      if (isOutsidePress) {
        onPress();
      }
    };

    // TODO: Somehow detect if tab press selects an item outside.

    document.addEventListener('mousedown', onDocumentMouseDown);

    return () => {
      document.removeEventListener('mousedown', onDocumentMouseDown);
    };
  }, [active]);
}
