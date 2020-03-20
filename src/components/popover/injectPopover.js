import React from 'react';
import PropTypes from 'prop-types';
import Popover from './Popover';
import BaseText from '../../utils/rnw-compat/BaseText';
import OverlayPropTypes from '../../utils/OverlayPropTypes';
import useOverlay from '../../hooks/useOverlay';

export default function injectPopover(Component) {
  const propTypes = {
    tooltip: PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.string.isRequired,
      ...OverlayPropTypes,
    }),
  };

  function OverlayPopover(props) {
    const {
      popover: {
        title,
        content,
        delay,
        trigger = 'click',
        placement = 'right',
        fallbackPlacement,
      },
      ...elementProps
    } = props;

    const target = <Component {...elementProps} />;

    const template = (
      <Popover>
        {title && <Popover.Header>{title}</Popover.Header>}
        <Popover.Body>
          <BaseText essentials={{}}>{content}</BaseText>
        </Popover.Body>
      </Popover>
    );

    return useOverlay(target, template, {
      delay,
      trigger,
      placement,
      fallbackPlacement,
    });
  }

  OverlayPopover.displayName = 'Overlay(Popover)';
  OverlayPopover.propTypes = propTypes;

  return OverlayPopover;
}
