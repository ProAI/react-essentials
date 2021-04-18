import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseView from '../utils/rnw-compat/BaseView';
import useAction, { ActionPropTypes } from '../hooks/useAction';
import useTrigger, { TriggerPropTypes } from '../hooks/useTrigger';
import useLink, { LinkPropTypes } from '../hooks/useLink';
import concatClasses from '../utils/concatClasses';
import concatTouchableProps from '../utils/concatTouchableProps';
import concatRefs from '../utils/concatRefs';

const propTypes = {
  ...TriggerPropTypes,
  ...LinkPropTypes,
  ...ActionPropTypes,
  children: PropTypes.node.isRequired,
};

const BlockLink = React.forwardRef((props, ref) => {
  const {
    toggle,
    dismiss,
    target,
    to,
    replace = false,
    external = false,
    keepFocus = false,
    ...elementProps
  } = props;

  const trigger = useTrigger(toggle, dismiss, target);
  const link = useLink(to, replace, external);
  const action = useAction(keepFocus);

  const classes = cx(
    // variable classes
    ...concatClasses(trigger),
  );

  // tabIndex is not working with this react-native-web version, we need to
  // re-check with the latest version.
  const tabIndexRef = useRef();

  useEffect(() => {
    if (to) {
      return;
    }

    tabIndexRef.current.setNativeProps({ tabIndex: 0 });
  }, []);

  return (
    <BaseView
      {...concatTouchableProps(
        { ...elementProps, ref: concatRefs(ref, tabIndexRef) },
        action,
        link,
        trigger,
      )}
      essentials={{ tag: 'a', className: classes }}
    />
  );
});

BlockLink.displayName = 'BlockLink';
BlockLink.propTypes = propTypes;

export default BlockLink;
