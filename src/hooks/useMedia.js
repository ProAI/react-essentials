import { useContext } from 'react';
import Context from '../Context';

const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];

export default function useMedia() {
  const viewport = useContext(Context);

  return {
    up(point) {
      return breakpoints.indexOf(viewport) >= breakpoints.indexOf(point);
    },
    down(point) {
      return breakpoints.indexOf(viewport) <= breakpoints.indexOf(point);
    },
    only(point) {
      return viewport === point;
    },
    between(lower, upper) {
      return this.up(lower) && this.down(upper);
    },
  };
}
