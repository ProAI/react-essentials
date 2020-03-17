import { useState } from 'react';

export default function useControlledState({
  defaultValue,
  value: propValue,
  onChange = () => {},
}) {
  const [stateValue, setStateValue] = useState(defaultValue);

  const isControlled = typeof propValue === 'boolean';

  const value = isControlled ? propValue : stateValue;

  const setValue = nextValue => {
    // console.log(value, nextValue);

    if (value === nextValue) {
      return;
    }

    if (!isControlled) {
      setStateValue(nextValue);
    }

    onChange(nextValue);
  };

  return [value, setValue];
}
