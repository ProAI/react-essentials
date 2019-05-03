import { useContext } from 'react';
import Context from '../Context';

export default function useMedia() {
  const { viewport, breakpoints } = useContext(Context);

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
