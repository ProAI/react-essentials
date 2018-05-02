import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
  onClick: PropTypes.func,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  onToggle: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

const defaultProps = {
  onClick: null,
};

class DropdownToggle extends React.Component {
  onClick = (e) => {
    e.preventDefault();

    if (this.props.onClick) {
      this.props.onClick(e);
    }

    this.props.onToggle();
  };

  render() {
    const {
      component: Component, visible, onToggle, ...otherProps
    } = this.props;

    const classes = cx(visible && 'active', 'dropdown-toggle');

    return (
      <Component
        {...otherProps}
        tempClassName={classes}
        onClick={this.onClick}
        aria-haspopup="true"
        aria-expanded={visible}
      />
    );
  }
}

DropdownToggle.propTypes = propTypes;
DropdownToggle.defaultProps = defaultProps;

export default DropdownToggle;
