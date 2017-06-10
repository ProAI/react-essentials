import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import cx from 'classnames';
import DropdownToggleButton from './DropdownToggleButton';
import DropdownMenu from './DropdownMenu';
import IdentifierGenerator from '../shared/IdentifierGenerator';

const propTypes = {
  children: PropTypes.node.isRequired,
  onToggle: PropTypes.func,
  visible: PropTypes.bool,
  className: PropTypes.string,
};

const childContextTypes = {
  onToggle: PropTypes.func.isRequired,
};

const defaultProps = {
  onToggle: null,
  visible: false,
  className: null,
};

class Dropdown extends React.Component {
  static ToggleButton = DropdownToggleButton;
  // wrap <DropdownMenu> so that we can inject triggerId later
  static Menu = props => <DropdownMenu {...props} />;

  state = {
    visible: this.props.visible,
  };

  getChildContext() {
    return {
      onToggle: this.onToggle,
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.onDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick);
  }

  onDocumentClick = (event) => {
    const dropdownElement = findDOMNode(this);
    if (event.target !== dropdownElement && !dropdownElement.contains(event.target)) {
      if (this.visible()) {
        this.onToggle();
      }
    }
  };

  onToggle = () => {
    if (this.props.onToggle) {
      this.props.onToggle();
    } else {
      this.setState({
        visible: !this.state.visible,
      });
    }
  };

  genIdentifier = IdentifierGenerator.generate('gen-dropdown-');

  visible = () => {
    if (this.props.onToggle) {
      return this.props.visible;
    }

    return this.state.visible;
  };

  render() {
    const { className, children, visible, onToggle, ...attributes } = this.props;

    // create component classes
    const classes = cx('dropdown', { show: this.visible() }, className);

    // check if dropdown has a dropdown trigger and menu
    if (React.Children.count(children) !== 2) {
      // eslint-disable-next-line
      console.warn(
        'A dropdown should have exactly two children. The first child should be a <Dropdown.Button> component and the second a <Dropdown.Menu>.',
      );
    }

    let identifier;
    const manipulatedChildren = React.Children.map(children, (child, i) => {
      // inject visible and onToggle props in DropdownTrigger
      if (i === 0) {
        if (child.props.id) {
          identifier = child.props.id;
        } else {
          identifier = this.genIdentifier;
        }
        return React.cloneElement(child, {
          visible: this.visible(),
          onToggle: this.onToggle,
          id: identifier,
        });
      }

      return React.cloneElement(child, {
        triggerId: identifier,
      });
    });

    return (
      <div {...attributes} className={classes}>
        {manipulatedChildren}
      </div>
    );
  }
}

Dropdown.propTypes = propTypes;
Dropdown.childContextTypes = childContextTypes;
Dropdown.defaultProps = defaultProps;

export default Dropdown;
