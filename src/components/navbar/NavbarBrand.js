import React from 'react';
import PropTypes from 'prop-types';
import BaseTouchable from '../../utils/rnw-compat/BaseTouchable';
import useAction, { ActionPropTypes } from '../../hooks/useAction';
import useLink, { LinkPropTypes } from '../../hooks/useLink';
import concatProps from '../../utils/concatProps';

const propTypes = {
  ...LinkPropTypes,
  ...ActionPropTypes,
  children: PropTypes.node.isRequired,
};

const NavbarBrand = React.forwardRef((props, ref) => {
  const { to, replace, external, keepFocus, ...elementProps } = props;

  const link = useLink(to, replace, external);
  const action = useAction(keepFocus);

  return (
    <BaseTouchable
      {...concatProps({ ...elementProps, ref }, action, link)}
      essentials={{ className: 'navbar-brand', tag: 'a' }}
    />
  );
});

NavbarBrand.displayName = 'NavbarBrand';
NavbarBrand.propTypes = propTypes;

export default NavbarBrand;
