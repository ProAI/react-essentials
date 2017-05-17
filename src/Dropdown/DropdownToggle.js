import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

const contextTypes = {
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

const defaultProps = {
  className: null,
  onClick: null,
  tag: 'button',
};

class DropdownToggle extends React.Component {
  onClick = (e) => {
    e.preventDefault();

    if (this.props.onClick) {
      this.props.onClick(e);
    }

    this.context.toggle();
  };

  render() {
    const { className, tag: Tag, ...attributes } = this.props;

    const classes = cx({ active: this.context.isOpen }, 'dropdown-universal-toggle', className);

    if (Tag === 'a') {
      attributes.href = '';
    }

    return <Tag {...attributes} className={classes} onClick={this.onClick} />;
  }
}

DropdownToggle.propTypes = propTypes;
DropdownToggle.contextTypes = contextTypes;
DropdownToggle.defaultProps = defaultProps;

export default DropdownToggle;
