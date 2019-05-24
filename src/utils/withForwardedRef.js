import React from 'react';

export default function withForwardedRef(Component, statics) {
  const callback = (props, ref) => {
    return <Component {...props} innerRef={ref} />;
  };

  callback.displayName = Component.name;

  const WrappedComponent = React.forwardRef(callback);

  if (statics) {
    statics.forEach(value => {
      WrappedComponent[value] = Component[value];
    });
  }

  return WrappedComponent;
}
