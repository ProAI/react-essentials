import React from 'react';
import TooltipWrapper from './TooltipWrapper';

export default function injectTooltip(Component) {
  return props => <TooltipWrapper component={Component} {...props} />;
}
