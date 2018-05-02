import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';

const propTypes = {
  triggerId: PropTypes.string.isRequired,
};

function DropdownMenu({ triggerId, ...otherProps }) {
  return <BaseView {...otherProps} className="dropdown-menu" aria-labelledby={triggerId} />;
}

DropdownMenu.propTypes = propTypes;

export default DropdownMenu;
