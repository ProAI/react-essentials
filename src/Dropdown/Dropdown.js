import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cx from 'classnames';

const propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  className: PropTypes.string,
};

const childContextTypes = {
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

const defaultProps = {
  isOpen: false,
};

class Dropdown extends Component {
  state = {
    isOpen: this.props.isOpen,
  }

  getChildContext() {
    return {
      toggle: this.toggle,
      isOpen: this.isOpen(),
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
      if (this.isOpen()) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    if (this.props.toggle) {
      this.props.toggle();
    } else {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    }
  }

  isOpen = () => {
    if (this.props.toggle) {
      return this.props.isOpen;
    }

    return this.state.isOpen;
  }

  render() {
    const { className, ...attributes } = this.props;
    delete attributes.toggle;
    delete attributes.isOpen;

    // create component classes
    const classes = cx(
      'dropdown',
      { active: this.isOpen() },
      className,
    );

    return (
      <div {...attributes} className={classes} />
    );
  }
}

Dropdown.propTypes = propTypes;
Dropdown.childContextTypes = childContextTypes;
Dropdown.defaultProps = defaultProps;

export default Dropdown;
