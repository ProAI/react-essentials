import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import invariant from 'fbjs/lib/invariant';
import BaseView from '../../utils/rnw-compat/BaseView';
import DropdownContext from './DropdownContext';
import useTarget from '../../hooks/useTarget';
import concatClasses from '../../utils/concatClasses';
import concatProps from '../../utils/concatProps';

const propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  right: PropTypes.bool,
};

const DropdownMenu = React.forwardRef((props, ref) => {
  const { right = false, id, ...elementProps } = props;

  const target = useTarget(DropdownContext, id);

  invariant(
    target,
    'DropdownMenu can only be used inside a Dropdown component.',
  );

  const classes = cx(
    // constant classes
    'dropdown-menu',
    // variable classes
    right && 'dropdown-menu-right',
    ...concatClasses(target),
  );

  return (
    <BaseView
      {...concatProps({ ...elementProps, ref }, target)}
      essentials={{ className: classes }}
    />
  );
});

DropdownMenu.displayName = 'DropdownMenu';
DropdownMenu.propTypes = propTypes;

export default DropdownMenu;
