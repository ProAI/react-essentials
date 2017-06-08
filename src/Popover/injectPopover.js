import React from 'react';
import PopoverWrapper from './PopoverWrapper';

export default function injectPopover(Component) {
  return props => <PopoverWrapper component={Component} {...props} />;
}
