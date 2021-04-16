import React from 'react';
import invariant from 'fbjs/lib/invariant';
import BaseTouchable from '../../utils/rnw-compat/BaseTouchable';
import useAction, { ActionPropTypes } from '../../hooks/useAction';
import useTrigger from '../../hooks/useTrigger';
import concatTouchableProps from '../../utils/concatTouchableProps';
import NavbarContext from './NavbarContext';

const propTypes = {
  ...ActionPropTypes,
};

const NavbarToggler = React.forwardRef((props, ref) => {
  const { keepFocus, ...elementProps } = props;

  const trigger = useTrigger(NavbarContext);

  if (!trigger) {
    invariant(
      trigger,
      'NavbarToggler can only be used inside a Navbar component.',
    );
  }

  const action = useAction(keepFocus);

  return (
    <BaseTouchable
      {...concatTouchableProps({ ...elementProps, ref }, action, trigger)}
      essentials={{ className: 'navbar-toggler' }}
    >
      <span className="navbar-toggler-icon" />
    </BaseTouchable>
  );
});

NavbarToggler.displayName = 'NavbarToggler';
NavbarToggler.propTypes = propTypes;

export default NavbarToggler;
