import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import DropdownMenuItem from './DropdownMenuItem';

const propTypes = {
  className: PropTypes.string,
  triggerId: PropTypes.string.isRequired,
};

const defaultProps = {
  className: null,
};

class DropdownMenu extends React.Component {
  static Item = DropdownMenuItem;

  render() {
    const { className, triggerId, ...attributes } = this.props;
    const classes = cx('dropdown-menu', className);

    return <div {...attributes} className={classes} aria-labelledby={triggerId} />;
  }
}

DropdownMenu.propTypes = propTypes;
DropdownMenu.defaultProps = defaultProps;

export default DropdownMenu;
