import { useRef } from 'react';
import PropTypes from 'prop-types';

export const ActionPropTypes = {
  keepFocus: PropTypes.bool,
};

export default function useAction(keepFocus, handlePress) {
  const ref = useRef();

  return {
    props: {
      accessibilityRole: 'button',
      onPress: (event) => {
        if (handlePress) handlePress(event);

        if (!keepFocus) {
          ref.current.blur();
        }
      },
      ref,
    },
  };
}
