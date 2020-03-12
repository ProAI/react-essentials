import { useContext, useRef } from 'react';
import Context from '../Context';

export default function useIdentifier(prefix) {
  const { generateKey } = useContext(Context);
  const ref = useRef();

  if (!ref.current) {
    ref.current = generateKey(prefix);
  }

  return ref.current;
}
