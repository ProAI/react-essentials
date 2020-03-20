import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import PopoverBody from './PopoverBody';
import PopoverHeader from './PopoverHeader';
import BaseView from '../../utils/rnw-compat/BaseView';
import { PLACEMENTS } from '../../utils/constants';

const propTypes = {
  children: PropTypes.node.isRequired,
  arrow: PropTypes.node,
  placement: PropTypes.oneOf(PLACEMENTS),
  visible: PropTypes.bool,
};

const Popover = React.forwardRef(function Popover(props, ref) {
  const {
    children,
    arrow,
    placement,
    visible = false,
    ...elementProps
  } = props;

  const classes = cx(
    // constant classes
    'popover',
    // variable classes
    visible && 'show',
    placement && `bs-popover-${placement}`,
  );

  return (
    <BaseView
      {...elementProps}
      ref={ref}
      accessibilityRole="tooltip"
      essentials={{ className: classes }}
    >
      {arrow}
      {children}
    </BaseView>
  );
});

Popover.displayName = 'Popover';
Popover.propTypes = propTypes;

Popover.Body = PopoverBody;
Popover.Header = PopoverHeader;

export default Popover;
