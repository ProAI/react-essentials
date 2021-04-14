import React from 'react';
import PropTypes from 'prop-types';
import Popover from './Popover';
import useOverlay, { OverlayPropTypes } from '../../hooks/useOverlay';

const propTypes = {
  popover: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.node.isRequired,
    ...OverlayPropTypes,
  }),
};

export default function injectPopover(Component) {
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
        <Popover.Body>{content}</Popover.Body>
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
