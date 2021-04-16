import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseText from '../utils/rnw-compat/BaseText';
import useAction, { ActionPropTypes } from '../hooks/useAction';
import useTrigger, { TriggerPropTypes } from '../hooks/useTrigger';
import useLink, { LinkPropTypes } from '../hooks/useLink';
import concatClasses from '../utils/concatClasses';
import concatTouchableProps from '../utils/concatTouchableProps';

const propTypes = {
  ...TriggerPropTypes,
  ...LinkPropTypes,
  ...ActionPropTypes,
  children: PropTypes.node.isRequired,
};

const Link = React.forwardRef((props, ref) => {
  const {
    toggle,
    target,
    to,
    replace = false,
    external = false,
    keepFocus = false,
    ...elementProps
  } = props;

  const trigger = useTrigger(toggle, target);
  const link = useLink(to, replace, external);
  const action = useAction(keepFocus);

  const classes = cx(
    // variable classes
    ...concatClasses(trigger),
  );

  return (
    <BaseText
      {...concatTouchableProps({ ...elementProps, ref }, action, link, trigger)}
      essentials={{ tag: 'a', className: classes }}
    />
  );
});

Link.displayName = 'Link';
Link.propTypes = propTypes;

export default Link;
