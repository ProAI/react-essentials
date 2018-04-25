import React from 'react';
import DropdownToggle from './DropdownToggle';

export default function injectDropdownToggle(Component) {
  return props => <DropdownToggle component={Component} {...props} />;
}
