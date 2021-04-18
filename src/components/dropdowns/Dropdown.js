import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseView from '../../utils/rnw-compat/BaseView';
import DropdownContext from './DropdownContext';
import DropdownMenu from './DropdownMenu';
import DropdownHeader from './DropdownHeader';
import DropdownDivider from './DropdownDivider';
import DropdownItem from './DropdownItem';
import DropdownTextItem from './DropdownTextItem';
import NavContext from '../nav/NavContext';
import useDropdown from './useDropdown';

const propTypes = {
  children: PropTypes.node,
  defaultVisible: PropTypes.bool,
  visible: PropTypes.bool,
  onToggle: PropTypes.func,
};

const Dropdown = React.forwardRef((props, ref) => {
  const {
    children,
    defaultVisible = false,
    visible,
    onToggle,
    ...elementProps
  } = props;

  const nav = useContext(NavContext);

  const dropdown = useDropdown(defaultVisible, visible, onToggle);

  // create component classes
  const classes = cx(
    // constant classes
    !nav && 'dropdown',
    nav && 'nav-dropdown',
    // variable classes
    dropdown.visible && 'show',
  );

  return (
    <DropdownContext.Provider value={dropdown}>
      <BaseView {...elementProps} ref={ref} essentials={{ className: classes }}>
        {children}
      </BaseView>
    </DropdownContext.Provider>
  );
});

Dropdown.displayName = 'Dropdown';
Dropdown.propTypes = propTypes;

Dropdown.Context = DropdownContext;
Dropdown.Menu = DropdownMenu;
Dropdown.Divider = DropdownDivider;
Dropdown.Header = DropdownHeader;
Dropdown.Item = DropdownItem;
Dropdown.TextItem = DropdownTextItem;

export default Dropdown;
