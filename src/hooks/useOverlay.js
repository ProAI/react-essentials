import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import findNodeHandle from 'react-native-web/dist/cjs/exports/findNodeHandle';
import { TRIGGERS, PLACEMENTS } from '../utils/constants';
import BaseView from '../utils/rnw-compat/BaseView';
import useIdentifier from './useIdentifier';
import usePopper from './usePopper';
import concatRefs from '../utils/concatRefs';
import optional from '../utils/optional';
import useControlledState from './useControlledState';

export const OverlayPropTypes = {
  delay: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      show: PropTypes.number,
      hide: PropTypes.number,
    }),
  ]),
  trigger: PropTypes.oneOf(TRIGGERS),
  placement: PropTypes.oneOf(PLACEMENTS),
  fallbackPlacement: PropTypes.oneOf(['flip', 'clockwise', 'counterwise']),
  defaultVisible: PropTypes.bool,
  visible: PropTypes.bool,
  onToggle: PropTypes.func,
};

function useOverlay(target, template, config) {
  const {
    delay: rawDelay = 0,
    trigger: rawTrigger,
    placement: defaultPlacement,
    fallbackPlacement = 'flip',
    defaultVisible = false,
    visible: controlledVisible,
    onToggle,
  } = config;

  const delay =
    typeof rawDelay === 'number'
      ? { show: rawDelay, hide: rawDelay }
      : rawDelay;
  const trigger = rawTrigger.split(' ');

  const identifier = useIdentifier('template');
  const [visible, setVisible] = useControlledState(
    defaultVisible,
    controlledVisible,
    onToggle,
  );
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const targetRef = useRef();
  const wrapperRef = useRef();
  const arrowRef = useRef();

  const { status, placement, arrowStyle, wrapperStyle } = usePopper({
    visible,
    refs: {
      target: targetRef,
      wrapper: wrapperRef,
      arrow: arrowRef,
    },
    delay,
    defaultPlacement,
    fallbackPlacement,
  });

  const targetElement = React.cloneElement(target, {
    key: 'target',
    ref: concatRefs((element) => {
      targetRef.current = findNodeHandle(element);
    }, target.ref),
    ...optional(visible, { 'aria-describedby': identifier }),
    onPress: (event) => {
      if (trigger.includes('click')) {
        setVisible((value) => !value);
      }

      if (target.props.onPress) {
        target.props.onPress(event);
      }
    },
    onFocus: (event) => {
      if (trigger.includes('focus')) {
        setFocused(true);

        if (!visible) {
          setVisible(true);
        }
      }

      if (target.props.onFocus) {
        target.props.onFocus(event);
      }
    },
    onBlur: (event) => {
      if (trigger.includes('focus')) {
        setFocused(false);

        const activeHoverTrigger = trigger.includes('hover') && hovered;
        if (visible && !activeHoverTrigger) {
          setVisible(false);
        }
      }

      if (target.props.onBlur) {
        target.props.onBlur(event);
      }
    },
    onMouseOver: (event) => {
      if (trigger.includes('hover')) {
        setHovered(true);

        if (!visible && !focused) {
          setVisible(true);
        }
      }

      if (target.props.onMouseOver) {
        target.props.onMouseOver(event);
      }
    },
    onMouseLeave: (event) => {
      if (trigger.includes('hover')) {
        setHovered(false);

        const activeFocusTrigger = trigger.includes('focus') && focused;
        if (visible && !activeFocusTrigger) {
          setVisible(false);
        }
      }

      if (target.props.onMouveLeave) {
        target.props.onMouseLeave(event);
      }
    },
  });

  if (!visible && status !== 'LOADED') {
    return targetElement;
  }

  const arrowElement = (
    <BaseView
      ref={(element) => {
        arrowRef.current = findNodeHandle(element);
      }}
      style={arrowStyle}
      essentials={{ className: 'arrow' }}
    />
  );

  const templateElement = React.cloneElement(template, {
    key: 'template',
    id: identifier,
    ref: concatRefs((element) => {
      wrapperRef.current = findNodeHandle(element);
    }, template.ref),
    placement,
    visible: status === 'LOADED',
    arrow: arrowElement,
    style: wrapperStyle,
  });

  return [targetElement, ReactDOM.createPortal(templateElement, document.body)];
}

export default useOverlay;
