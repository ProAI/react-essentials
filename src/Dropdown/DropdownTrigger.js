import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  component: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

const defaultProps = {
  className: null,
  onClick: null,
};

class DropdownTrigger extends React.Component {
  onClick = (e) => {
    e.preventDefault();

    if (this.props.onClick) {
      this.props.onClick(e);
    }

    this.props.onToggle();
  };

  render() {
    const { className, component: Component, visible, onToggle, ...attributes } = this.props;

    const classes = cx({ active: visible }, 'dropdown-toggle', className);

    return (
      <Component
        {...attributes}
        className={classes}
        onClick={this.onClick}
        aria-haspopup="true"
        aria-expanded={visible}
      />
    );
  }
}

DropdownTrigger.propTypes = propTypes;
DropdownTrigger.defaultProps = defaultProps;

export default DropdownTrigger;
