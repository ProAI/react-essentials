import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import invariant from 'fbjs/lib/invariant';
import findNodeHandle from 'react-native-web/dist/cjs/exports/findNodeHandle';
import BaseView from '../../utils/rnw-compat/BaseView';
import setRef from '../../utils/setRef';
import useIdentifier from '../../hooks/useIdentifier';
import useControlledState from '../../hooks/useControlledState';
import useOutsidePress from '../../hooks/useOutsidePress';

import DropdownMenu from './DropdownMenu';
import DropdownHeader from './DropdownHeader';
import DropdownDivider from './DropdownDivider';
import DropdownItem from './DropdownItem';
import DropdownTextItem from './DropdownTextItem';

const propTypes = {
  children: PropTypes.arrayOf(PropTypes.element.isRequired),
  visible: PropTypes.bool,
  onToggle: PropTypes.func,
};

const Dropdown = React.forwardRef((props, ref) => {
  const { children, visible, onToggle = () => {}, ...elementProps } = props;

  // check if dropdown has a dropdown trigger and menu
  if (process.env.NODE_ENV !== 'production') {
    invariant(
      React.Children.count(children) === 2,
      'A dropdown should have exactly two children. The first child should be a <Button> or <Link> component and the second a <Dropdown.Menu>.',
    );
  }

  const identifier = useIdentifier('dropdown');
  const [isMenuOpen, setMenuOpen] = useControlledState({
    defaultValue: false,
    value: visible,
    onChange: () => {
      onToggle();
    },
  });

  const control = useRef();
  const menu = useRef();

  useOutsidePress({
    insideRefs: [control, menu],
    active: isMenuOpen,
    onPress: () => {
      setMenuOpen(false);
    },
  });

  // create component classes
  const classes = cx(
    // constant classes
    'dropdown',
    // variable classes
    isMenuOpen && 'show',
  );

  const controlElement = React.cloneElement(children[0], {
    id: identifier,
    ref: (element) => {
      control.current = findNodeHandle(element);
      setRef(children[0].ref, element);
    },
    onPress: (event) => {
      if (children[0].props.onPress) {
        children[0].props.onPress(event);
      }

      setMenuOpen((currentIsMenuOpen) => !currentIsMenuOpen);
    },
    'aria-haspopup': true,
    'aria-expanded': isMenuOpen,
  });

  const menuElement = React.cloneElement(children[1], {
    triggerId: identifier,
    ref: (element) => {
      menu.current = findNodeHandle(element);
      setRef(children[1].ref, element);
    },
  });

  return (
    <BaseView {...elementProps} ref={ref} essentials={{ className: classes }}>
      {controlElement}
      {isMenuOpen && menuElement}
    </BaseView>
  );
});

Dropdown.propTypes = propTypes;

Dropdown.Menu = DropdownMenu;
Dropdown.Divider = DropdownDivider;
Dropdown.Header = DropdownHeader;
Dropdown.Item = DropdownItem;
Dropdown.TextItem = DropdownTextItem;

export default Dropdown;
