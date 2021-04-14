import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseView from '../../utils/rnw-compat/BaseView';
import DropdownContext from './DropdownContext';
import DropdownMenu from './DropdownMenu';
import DropdownHeader from './DropdownHeader';
import DropdownDivider from './DropdownDivider';
import DropdownItem from './DropdownItem';
import DropdownTextItem from './DropdownTextItem';
import useDropdownState from './useDropdownState';

const propTypes = {
  children: PropTypes.arrayOf(PropTypes.element.isRequired),
  defaultVisible: PropTypes.bool,
  visible: PropTypes.bool,
  onToggle: PropTypes.func,
};

const Dropdown = React.forwardRef((props, ref) => {
  const {
    children,
    defaultVisible = false,
    visible,
    onToggle = () => {},
    ...elementProps
  } = props;

  const state = useDropdownState(defaultVisible, visible, onToggle);

  // create component classes
  const classes = cx(
    // constant classes
    'dropdown',
    // variable classes
    visible && 'show',
  );

  return (
    <DropdownContext.Provider value={state}>
      <BaseView {...elementProps} ref={ref} essentials={{ className: classes }}>
        {children}
      </BaseView>
    </DropdownContext.Provider>
  );
});

Dropdown.propTypes = propTypes;

Dropdown.Context = DropdownContext;
Dropdown.Menu = DropdownMenu;
Dropdown.Divider = DropdownDivider;
Dropdown.Header = DropdownHeader;
Dropdown.Item = DropdownItem;
Dropdown.TextItem = DropdownTextItem;

export default Dropdown;
