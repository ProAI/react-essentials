import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import findNodeHandle from 'react-native-web/dist/cjs/exports/findNodeHandle';
import BaseView from '../utils/rnw-compat/BaseView';
import useIdentifier from './useIdentifier';
import usePopper from './usePopper';
import setRef from '../utils/setRef';

function useOverlay(target, template, config) {
  const {
    delay: rawDelay = 0,
    trigger: rawTrigger,
    placement: defaultPlacement,
    fallbackPlacement = 'flip',
  } = config;

  const delay =
    typeof rawDelay === 'number'
      ? { show: rawDelay, hide: rawDelay }
      : rawDelay;
  const trigger = rawTrigger.split(' ');

  const identifier = useIdentifier('template');
  const [visible, setVisible] = useState(false);
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
    ref: element => {
      targetRef.current = findNodeHandle(element);
      setRef(target.ref, element);
    },
    'aria-describedby': visible ? identifier : undefined,
    onPress: event => {
      if (trigger.indexOf('click') !== -1) {
        setVisible(value => !value);
      }

      if (target.props.onPress) {
        target.props.onPress(event);
      }
    },
    onFocus: event => {
      if (trigger.indexOf('focus') !== -1) {
        setFocused(true);

        if (trigger.indexOf('focus') !== -1 && !visible) {
          setVisible(true);
        }
      }

      if (target.props.onFocus) {
        target.props.onFocus(event);
      }
    },
    onBlur: event => {
      if (trigger.indexOf('focus') !== -1) {
        setFocused(false);

        const activeHoverTrigger = trigger.indexOf('hover') !== -1 && hovered;
        if (visible && !activeHoverTrigger) {
          setVisible(false);
        }
      }

      if (target.props.onBlur) {
        target.props.onBlur(event);
      }
    },
    onMouseOver: event => {
      if (trigger.indexOf('hover') !== -1) {
        setHovered(true);

        if (!visible && !focused) {
          setVisible(true);
        }
      }

      if (target.props.onMouseOver) {
        target.props.onMouseOver(event);
      }
    },
    onMouseLeave: event => {
      if (trigger.indexOf('hover') !== -1) {
        setHovered(false);

        const activeFocusTrigger = trigger.indexOf('focus') !== -1 && focused;
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
      ref={element => {
        arrowRef.current = findNodeHandle(element);
      }}
      style={arrowStyle}
      essentials={{ className: 'arrow' }}
    />
  );

  const templateElement = React.cloneElement(template, {
    key: 'template',
    id: identifier,
    ref: element => {
      wrapperRef.current = findNodeHandle(element);
      setRef(template.ref, element);
    },
    placement,
    visible: status === 'LOADED',
    arrow: arrowElement,
    style: wrapperStyle,
  });

  return [targetElement, ReactDOM.createPortal(templateElement, document.body)];
}

export default useOverlay;
