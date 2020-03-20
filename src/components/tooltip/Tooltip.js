import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseView from '../../utils/rnw-compat/BaseView';
import BaseText from '../../utils/rnw-compat/BaseText';
import { PLACEMENTS } from '../../utils/constants';

const propTypes = {
  children: PropTypes.node.isRequired,
  arrow: PropTypes.node,
  placement: PropTypes.oneOf(PLACEMENTS),
  visible: PropTypes.bool,
};

const Tooltip = React.forwardRef(function Tooltip(props, ref) {
  const {
    children,
    arrow,
    placement,
    visible = false,
    ...elementProps
  } = props;

  const classes = cx(
    // constant classes
    'tooltip',
    // variable classes
    visible && 'show',
    placement && `bs-tooltip-${placement}`,
  );

  return (
    <BaseView
      {...elementProps}
      ref={ref}
      accessibilityRole="tooltip"
      essentials={{ className: classes }}
    >
      {arrow}
      <BaseText essentials={{ className: 'tooltip-inner', blockOnly: true }}>
        {children}
      </BaseText>
    </BaseView>
  );
});

Tooltip.displayName = 'Tooltip';
Tooltip.propTypes = propTypes;

export default Tooltip;
