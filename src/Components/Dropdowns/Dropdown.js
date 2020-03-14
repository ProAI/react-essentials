import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import invariant from 'fbjs/lib/invariant';
import { findNodeHandle } from 'react-native-web';
import DropdownMenu from './DropdownMenu';
import DropdownHeader from './DropdownHeader';
import DropdownDivider from './DropdownDivider';
import DropdownItem from './DropdownItem';
import DropdownTextItem from './DropdownTextItem';
import BaseView from '../../utils/rnw-compat/BaseView';
import withForwardedRef from '../../utils/withForwardedRef';
import Context from '../../Context';
import setRef from '../../utils/setRef';

const propTypes = {
  children: PropTypes.node.isRequired,
  onToggle: PropTypes.func,
  visible: PropTypes.bool,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

const defaultProps = {
  onToggle: null,
  visible: null,
  innerRef: null,
};

class Dropdown extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      visible: false,
    };

    this.identifier = context.generateKey('re-dropdown-');
  }

  componentWillUnmount() {
    if (this.visible()) {
      document.removeEventListener('mousedown', this.handleDocumentClick);
    }
  }

  handleDocumentClick = event => {
    const dropdownElement = findNodeHandle(this.element);

    if (this.visible()) {
      if (
        event.target !== dropdownElement &&
        !dropdownElement.contains(event.target)
      ) {
        this.handleToggle();
      }
    }
  };

  handleToggle = () => {
    if (this.visible()) {
      document.removeEventListener('mousedown', this.handleDocumentClick);
    } else {
      document.addEventListener('mousedown', this.handleDocumentClick);
    }

    const { state, props } = this;

    // execute custom onToggle function
    if (props.onToggle !== null) {
      props.onToggle();
    }

    // automatically controlled
    if (props.visible === null) {
      this.setState({
        visible: !state.visible,
      });
    }
  };

  visible = () => {
    const { state, props } = this;

    if (props.visible !== null) {
      return props.visible;
    }

    return state.visible;
  };

  render() {
    const {
      children,
      visible,
      onToggle,
      innerRef,
      ...elementProps
    } = this.props;

    // check if dropdown has a dropdown trigger and menu
    if (process.env.NODE_ENV !== 'production') {
      invariant(
        React.Children.count(children) === 2,
        'A dropdown should have exactly two children. The first child should be a <Button> or <Link> component and the second a <Dropdown.Menu>.',
      );
    }

    // create component classes
    const classes = cx(
      // constant classes
      'dropdown',
      // variable classes
      this.visible() && 'show',
    );

    const identifier = children[0].props.id
      ? children[0].props.id
      : this.identifier;

    const onPress = e => {
      if (children[0].props.onPress) {
        children[0].props.onPress(e);
      }

      this.handleToggle();
    };

    const toggleChild = React.cloneElement(children[0], {
      id: identifier,
      onPress,
      'aria-haspopup': true,
      'aria-expanded': this.visible(),
    });

    const menuChild = React.cloneElement(children[1], {
      triggerId: identifier,
    });

    return (
      <BaseView
        {...elementProps}
        ref={element => {
          this.element = element;
          setRef(innerRef, element);
        }}
        essentials={{ className: classes }}
      >
        {toggleChild}
        {this.visible() && menuChild}
      </BaseView>
    );
  }
}

Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;
Dropdown.contextType = Context;

Dropdown.Menu = DropdownMenu;
Dropdown.Divider = DropdownDivider;
Dropdown.Header = DropdownHeader;
Dropdown.Item = DropdownItem;
Dropdown.TextItem = DropdownTextItem;

export default withForwardedRef(Dropdown, [
  'Menu',
  'Divider',
  'Header',
  'Item',
  'TextItem',
]);
