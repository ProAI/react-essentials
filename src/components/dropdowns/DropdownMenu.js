import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import invariant from 'fbjs/lib/invariant';
import BaseView from '../../utils/rnw-compat/BaseView';
import DropdownContext from './DropdownContext';
import concatRefs from '../../utils/concatRefs';

const propTypes = {
  children: PropTypes.node.isRequired,
  right: PropTypes.bool,
};

const DropdownMenu = React.forwardRef((props, ref) => {
  const { right = false, ...elementProps } = props;

  const dropdown = useContext(DropdownContext);

  invariant(
    dropdown,
    'DropdownMenu can only be used inside a Dropdown component.',
  );

  const classes = cx(
    // constant classes
    'dropdown-menu',
    // variable classes
    right && 'dropdown-menu-right',
    dropdown.visible && 'show',
  );

  return (
    <BaseView
      {...elementProps}
      ref={concatRefs(dropdown.menuRef, ref)}
      aria-labelledby={dropdown.identifier}
      essentials={{ className: classes }}
    />
  );
});

DropdownMenu.displayName = 'DropdownMenu';
DropdownMenu.propTypes = propTypes;

export default DropdownMenu;
