import React, { useContext } from 'react';
import BaseTouchable from '../../utils/rnw-compat/BaseTouchable';
import useAction from '../../hooks/useAction';
import ActionPropTypes from '../../utils/ActionPropTypes';
import useMedia from '../../hooks/useMedia';
import NavbarContext from './NavbarContext';

const propTypes = {
  ...ActionPropTypes,
};

const NavbarToggler = React.forwardRef((props, ref) => {
  const { onPress: handlePress, ...elementProps } = props;

  const media = useMedia();
  const context = useContext(NavbarContext);

  const { ...actionProps } = useAction(
    {
      ...elementProps,
      onPress: (event) => {
        if (handlePress) handlePress(event);

        context.toggle();
      },
    },
    ref,
  );

  if (context.expand === true || (context.expand && media.up(context.expand))) {
    return null;
  }

  return (
    <BaseTouchable
      {...actionProps}
      aria-controls={context.identifier}
      aria-expanded={context.expanded}
      aria-label="Toggle navigation"
      essentials={{ className: 'navbar-toggler' }}
    >
      <span className="navbar-toggler-icon" />
    </BaseTouchable>
  );
});

NavbarToggler.displayName = 'NavbarToggler';
NavbarToggler.propTypes = propTypes;

export default NavbarToggler;
