import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
  triggerId: PropTypes.string,
};

const defaultProps = {
  triggerId: null,
};

function DropdownMenu({ triggerId, ...elementProps }) {
  return (
    <BaseView
      {...elementProps}
      aria-labelledby="triggerId"
      essentials={{ className: 'dropdown-menu' }}
    />
  );
}

DropdownMenu.propTypes = propTypes;
DropdownMenu.defaultProps = defaultProps;

export default DropdownMenu;
