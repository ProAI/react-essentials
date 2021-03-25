import React from 'react';
import PropTypes from 'prop-types';
import BaseText from '../../utils/rnw-compat/BaseText';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const NavbarText = React.forwardRef((props, ref) => (
  <BaseText
    {...props}
    ref={ref}
    essentials={{
      tag: 'span',
      className: 'navbar-text',
    }}
  />
));

NavbarText.displayName = 'NavbarText';
NavbarText.propTypes = propTypes;

export default NavbarText;
