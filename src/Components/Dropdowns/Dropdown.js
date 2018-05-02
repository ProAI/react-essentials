import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import DropdownToggleButton from './DropdownToggleButton';
import DropdownMenu from './DropdownMenu';
import DropdownItem from './DropdownItem';
import { BaseView } from '../../utils/components';
import { generateKey } from '../../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  onToggle: PropTypes.func,
  visible: PropTypes.bool,
};

const childContextTypes = {
  onToggle: PropTypes.func.isRequired,
};

const defaultProps = {
  onToggle: null,
  visible: null,
};

class Dropdown extends React.Component {
  state = {
    visible: false,
  };

  getChildContext() {
    return {
      onToggle: this.handleToggle,
    };
  }

  componentWillUnmount() {
    if (this.visible()) {
      document.removeEventListener('mousedown', this.handleDocumentClick);
    }
  }

  handleDocumentClick = (event) => {
    const dropdownElement = this.element;

    if (this.visible()) {
      if (event.target !== dropdownElement && !dropdownElement.contains(event.target)) {
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

    // execute custom onToggle function
    if (this.props.onToggle !== null) {
      this.props.onToggle();
    }

    // automatically controlled
    if (this.props.visible === null) {
      this.setState({
        visible: !this.state.visible,
      });
    }
  };

  identifier = generateKey('re-dropdown-');

  visible = () => {
    if (this.props.visible !== null) {
      return this.props.visible;
    }

    return this.state.visible;
  };

  render() {
    const {
      children, visible, onToggle, ...otherProps
    } = this.props;

    // create component classes
    const classes = cx(
      // constant classes
      'dropdown',
      // variable classes
      this.visible() && 'show',
    );

    // check if dropdown has a dropdown trigger and menu
    if (React.Children.count(children) !== 2) {
      // eslint-disable-next-line
      console.warn(
        'A dropdown should have exactly two children. The first child should be a <Dropdown.Button> component and the second a <Dropdown.Menu>.');
    }

    let identifier;
    const manipulatedChildren = React.Children.map(children, (child, i) => {
      // inject visible and onToggle props in DropdownTrigger
      if (i === 0) {
        if (child.props.id) {
          identifier = child.props.id;
        } else {
          // eslint-disable-next-line prefer-destructuring
          identifier = this.identifier;
        }
        return React.cloneElement(child, {
          visible: this.visible(),
          onToggle: this.handleToggle,
          id: identifier,
        });
      }

      return React.cloneElement(child, {
        triggerId: identifier,
      });
    });

    return (
      <BaseView
        {...otherProps}
        ref={(element) => {
          this.element = element;
        }}
        className={classes}
      >
        {manipulatedChildren}
      </BaseView>
    );
  }
}

Dropdown.propTypes = propTypes;
Dropdown.childContextTypes = childContextTypes;
Dropdown.defaultProps = defaultProps;

Dropdown.ToggleButton = DropdownToggleButton;
// wrap <DropdownMenu> so that we can inject triggerId later
Dropdown.Menu = props => <DropdownMenu {...props} />;
Dropdown.Item = DropdownItem;

export default Dropdown;
