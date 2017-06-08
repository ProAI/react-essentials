import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from './Tooltip';
import { tetherAttachements, triggerCombinations } from '../shared/helpers';

const propTypes = {
  children: PropTypes.node.isRequired,
  component: PropTypes.node.isRequired,
  tooltip: PropTypes.shape({
    title: PropTypes.string,
    placement: PropTypes.oneOf(tetherAttachements),
    onToggle: PropTypes.func,
    target: PropTypes.string.isRequired,
    visible: PropTypes.bool,
    trigger: PropTypes.oneOf(triggerCombinations),
    disabled: PropTypes.bool,
  }).isRequired,
};

function TooltipWrapper({ component: Component, children, tooltip, ...attributes }) {
  const { title, ...tooltipAttributes } = tooltip;
  return (
    <Component {...attributes}>
      {children}
      <Tooltip {...tooltipAttributes}>{title}</Tooltip>
    </Component>
  );
}

TooltipWrapper.propTypes = propTypes;

export default TooltipWrapper;
