import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import invariant from 'fbjs/lib/invariant';
import BaseTouchable from '../../utils/rnw-compat/BaseTouchable';
import DropdownContext from './DropdownContext';
import useAction, { ActionPropTypes } from '../../hooks/useAction';
import useTrigger, { TriggerPropTypes } from '../../hooks/useTrigger';
import useLink, { LinkPropTypes } from '../../hooks/useLink';
import concatClasses from '../../utils/concatClasses';
import concatTouchableProps from '../../utils/concatTouchableProps';
import optional from '../../utils/optional';

const propTypes = {
  ...TriggerPropTypes,
  ...LinkPropTypes,
  ...ActionPropTypes,
  children: PropTypes.node.isRequired,
  keepVisible: PropTypes.bool,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
};

const DropdownItem = React.forwardRef((props, ref) => {
  const {
    toggle,
    dismiss,
    target,
    to,
    replace = false,
    external = false,
    keepFocus = false,
    keepVisible = false,
    active = false,
    disabled = false,
    ...elementProps
  } = props;

  const dropdown = useContext(DropdownContext);

  invariant(
    dropdown,
    'DropdownItem can only be used inside a Dropdown component.',
  );

  const trigger = useTrigger(toggle, dismiss, target);
  const link = useLink(to, replace, external);
  const action = useAction(keepFocus, () => {
    if (!keepVisible) dropdown.setVisible(false);
  });

  // create component classes
  const classes = cx(
    // constant classes
    'dropdown-item',
    // variable classes
    active && 'active',
    disabled && 'disabled',
    ...concatClasses(trigger),
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

DropdownItem.displayName = 'DropdownItem';
DropdownItem.propTypes = propTypes;

export default DropdownItem;
