import React from 'react';
import PropTypes from 'prop-types';
import Popover from './Popover';
import { tetherAttachements, triggerCombinations } from '../shared/helpers';

const propTypes = {
  children: PropTypes.node.isRequired,
  component: PropTypes.node.isRequired,
  popover: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    className: PropTypes.string,
    placement: PropTypes.oneOf(tetherAttachements),
    onToggle: PropTypes.func,
    target: PropTypes.string.isRequired,
    visible: PropTypes.bool,
    trigger: PropTypes.oneOf(triggerCombinations),
    disabled: PropTypes.bool,
  }).isRequired,
};

function PopoverWrapper({ component: Component, children, popover, ...attributes }) {
  const { content, ...popoverAttributes } = popover;
  return (
    <Component {...attributes}>
      {children}
      <Popover {...popoverAttributes}>{content}</Popover>
    </Component>
  );
}

PopoverWrapper.propTypes = propTypes;

export default PopoverWrapper;
