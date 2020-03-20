import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from './Tooltip';
import OverlayPropTypes from '../../utils/OverlayPropTypes';
import useOverlay from '../../hooks/useOverlay';

export default function injectTooltip(Component) {
  const propTypes = {
    tooltip: PropTypes.shape({
      title: PropTypes.string.isRequired,
      ...OverlayPropTypes,
    }),
  };

  function OverlayTooltip(props) {
    const {
      tooltip: {
        title,
        delay,
        trigger = 'hover focus',
        placement = 'top',
        fallbackPlacement,
      },
      ...elementProps
    } = props;

    const target = <Component {...elementProps} />;

    const template = <Tooltip>{title}</Tooltip>;

    return useOverlay(target, template, {
      delay,
      trigger,
      placement,
      fallbackPlacement,
    });
  }

  OverlayTooltip.displayName = 'Overlay(Tooltip)';
  OverlayTooltip.propTypes = propTypes;

  return OverlayTooltip;
}
