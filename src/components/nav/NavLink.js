import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseTouchable from '../../utils/rnw-compat/BaseTouchable';
import NavbarContext from '../navbar/NavbarContext';
import useTarget from '../../hooks/useTarget';
import useAction, { ActionPropTypes } from '../../hooks/useAction';
import useTrigger, { TriggerPropTypes } from '../../hooks/useTrigger';
import useNavLink, { NavLinkPropTypes } from './useNavLink';
import concatClasses from '../../utils/concatClasses';
import concatProps from '../../utils/concatProps';
import optional from '../../utils/optional';

const propTypes = {
  ...TriggerPropTypes,
  ...NavLinkPropTypes,
  ...ActionPropTypes,
  children: PropTypes.node.isRequired,
  keepExpanded: PropTypes.bool,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
};

const NavLink = React.forwardRef((props, ref) => {
  const {
    toggle,
    target,
    to,
    replace = false,
    external = false,
    exact = false,
    strict = false,
    keepFocus = false,
    keepExpanded = false,
    active = false,
    disabled = false,
    ...elementProps
  } = props;

  const navbar = useTarget(NavbarContext);

  const trigger = useTrigger(toggle, target);
  const link = useNavLink(to, replace, external, exact, strict);
  const action = useAction(keepFocus, () => {
    if (navbar && !keepExpanded) navbar.toggle();
  });

  const classes = cx(
    // constant classes
    'nav-link',
    // variable classes
    active && 'active',
    disabled && 'disabled',
    ...concatClasses(link, trigger),
  );

  return (
    <BaseTouchable
      {...concatProps({ ...elementProps, ref }, action, link, trigger)}
      {...optional(active, { 'aria-current': true })}
      disabled={disabled}
      essentials={{ tag: 'a', className: classes }}
    />
  );
});

NavLink.displayName = 'NavLink';
NavLink.propTypes = propTypes;

export default NavLink;
