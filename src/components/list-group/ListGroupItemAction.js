import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { COLORS } from '../../utils/constants';
import BaseTouchable from '../../utils/rnw-compat/BaseTouchable';
import useAction, { ActionPropTypes } from '../../hooks/useAction';
import useTrigger, { TriggerPropTypes } from '../../hooks/useTrigger';
import useNavLink, { NavLinkPropTypes } from '../nav/useNavLink';
import concatClasses from '../../utils/concatClasses';
import concatTouchableProps from '../../utils/concatTouchableProps';
import optional from '../../utils/optional';

const propTypes = {
  ...TriggerPropTypes,
  ...NavLinkPropTypes,
  ...ActionPropTypes,
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(COLORS),
  active: PropTypes.bool,
  disabled: PropTypes.bool,
};

const ListGroupItemAction = React.forwardRef((props, ref) => {
  const {
    toggle,
    target,
    to,
    replace = false,
    external = false,
    exact = false,
    strict = false,
    keepFocus = false,
    color,
    active = false,
    disabled = false,
    ...elementProps
  } = props;

  const trigger = useTrigger(toggle, target);
  const link = useNavLink(to, replace, external, exact, strict);
  const action = useAction(keepFocus);

  const classes = cx(
    // constant classes
    'list-group-item',
    'list-group-item-action',
    // variable classes
    color && `list-group-item-${color}`,
    active && 'active',
    disabled && 'disabled',
    ...concatClasses(link, trigger),
  );

  return (
    <BaseTouchable
      {...concatTouchableProps({ ...elementProps, ref }, action, link, trigger)}
      {...optional(active, { 'aria-current': true })}
      disabled={disabled}
      essentials={{ className: classes }}
    />
  );
});

ListGroupItemAction.displayName = 'ListGroupItemAction';
ListGroupItemAction.propTypes = propTypes;

export default ListGroupItemAction;
