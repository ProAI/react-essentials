import { useContext, useRef } from 'react';
import Context from '../Context';

export default function useIdentifier() {
  const { generateKey } = useContext(Context);
  const ref = useRef();

  if (!ref.current) {
    ref.current = generateKey();
  }

  return ref.current;
}
