import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import invariant from 'fbjs/lib/invariant';
import DropdownMenu from './DropdownMenu';
import DropdownHeader from './DropdownHeader';
import DropdownDivider from './DropdownDivider';
import DropdownItem from './DropdownItem';
import DropdownTextItem from './DropdownTextItem';
import BaseView from '../../utils/rnw-compat/BaseView';
import Context from '../../Context';

const propTypes = {
  children: PropTypes.node.isRequired,
  onToggle: PropTypes.func,
  visible: PropTypes.bool,
};

const defaultProps = {
  onToggle: null,
  visible: null,
};

class Dropdown extends React.Component {
  static contextType = Context;

  constructor(props, context) {
    super(props, context);

    this.identifier = context.generateKey('re-dropdown-');
  }

  state = {
    visible: false,
  };

  componentWillUnmount() {
    if (this.visible()) {
      document.removeEventListener('mousedown', this.handleDocumentClick);
    }
  }

  handleDocumentClick = event => {
    const dropdownElement = this.element;
    console.log(dropdownElement);

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
    const { children, visible, onToggle, ...elementProps } = this.props;

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

    const onClick = e => {
      e.preventDefault();

      if (children[0].props.onClick) {
        children[0].props.onClick(e);
      }

      this.handleToggle();
    };

    const toggleChild = React.cloneElement(children[0], {
      id: identifier,
      onClick,
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

Dropdown.Menu = DropdownMenu;
Dropdown.Divider = DropdownDivider;
Dropdown.Header = DropdownHeader;
Dropdown.Item = DropdownItem;
Dropdown.TextItem = DropdownTextItem;

export default Dropdown;
