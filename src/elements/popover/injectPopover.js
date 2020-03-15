import React from 'react';
import Popover from './Popover';

export default function injectPopover(Component) {
  // eslint-disable-next-line react/prop-types
  return ({ popover, ...props }) => (
    <Popover target={<Component {...props} />} {...popover} />
  );
}
