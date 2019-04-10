import { useContext, useState, useEffect } from 'react';
import Dimensions from 'react-native-web/dist/cjs/exports/Dimensions';
import Context from '../Context';

const calculateViewport = (width, breakpoints) => {
  if (width < breakpoints.sm) {
    return 'xs';
  }
  if (width < breakpoints.md) {
    return 'sm';
  }
  if (width < breakpoints.lg) {
    return 'md';
  }
  if (width < breakpoints.xl) {
    return 'lg';
  }
  return 'xl';
};

export default function useMedia() {
  const { ssrViewport, breakpoints } = useContext(Context);
  const [viewport, setViewport] = useState(ssrViewport);

  useEffect(() => {
    const handleChange = dimensions => {
      const nextViewport = calculateViewport(
        dimensions.window.width,
        breakpoints,
      );

      if (viewport !== nextViewport) {
        setViewport(nextViewport);
      }
    };
    Dimensions.addEventListener('change', handleChange);

    return () => {
      Dimensions.removeEventListener('change', handleChange);
    };
  });

  const breakpointKeys = Object.keys(breakpoints);

  return {
    up(point) {
      return breakpointKeys.indexOf(viewport) >= breakpointKeys.indexOf(point);
    },
    down(point) {
      return breakpointKeys.indexOf(viewport) <= breakpointKeys.indexOf(point);
    },
    only(point) {
      return viewport === point;
    },
    between(lower, upper) {
      return this.up(lower) && this.down(upper);
    },
  };
}
