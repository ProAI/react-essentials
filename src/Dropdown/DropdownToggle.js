import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

const contextTypes = {
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

const defaultProps = {
  tag: 'button',
};

class DropdownToggle extends Component {
  onClick = (e) => {
    e.preventDefault();

    if (this.props.onClick) {
      this.props.onClick(e);
    }

    this.context.toggle();
  }

  render() {
    const { className, tag: Tag, ...attributes } = this.props;

    const classes = cx(
      { active: this.context.isOpen },
      'dropdown-universal-toggle',
      className,
    );

    if (Tag === 'a') {
      attributes.href = '';
    }

    return (
      <Tag {...attributes} className={classes} onClick={this.onClick} />
    );
  }
}

DropdownToggle.propTypes = propTypes;
DropdownToggle.contextTypes = contextTypes;
DropdownToggle.defaultProps = defaultProps;

export default DropdownToggle;
