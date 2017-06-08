import React from 'react';
import DropdownTrigger from './DropdownTrigger';

export default function injectDropdownTrigger(Component) {
  return props => <DropdownTrigger component={Component} {...props} />;
}
