import React from 'react';
import Tooltip from './Tooltip';

export default function injectTooltip(Component) {
  // eslint-disable-next-line react/prop-types
  return ({ tooltip, ...props }) => <Tooltip target={<Component {...props} />} {...tooltip} />;
}
