import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from './Tooltip';
import useOverlay, { OverlayPropTypes } from '../../hooks/useOverlay';

const propTypes = {
  tooltip: PropTypes.shape({
    title: PropTypes.string.isRequired,
    ...OverlayPropTypes,
  }),
};

export default function injectTooltip(Component) {
  const OverlayTooltip = React.forwardRef((props, ref) => {
    /* eslint-disable react/prop-types */
    const {
      tooltip: {
        title,
        delay,
        trigger = 'hover focus',
        placement = 'top',
        fallbackPlacement,
        defaultVisible,
        visible,
        onToggle,
      },
      ...elementProps
    } = props;
    /* eslint-enable */

    const target = <Component {...elementProps} ref={ref} />;

    const template = <Tooltip>{title}</Tooltip>;

    return useOverlay(target, template, {
      delay,
      trigger,
      placement,
      fallbackPlacement,
      defaultVisible,
      visible,
      onToggle,
    });
  });

  OverlayTooltip.displayName = 'Overlay(Tooltip)';
  OverlayTooltip.propTypes = propTypes;

  return OverlayTooltip;
}
