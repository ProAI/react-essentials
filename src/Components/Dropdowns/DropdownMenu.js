import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
  triggerId: PropTypes.string,
};

const defaultProps = {
  triggerId: null,
};

function DropdownMenu({ children, triggerId, ...elementProps }) {
  return (
    <BaseView props={{ ...elementProps, 'aria-labelledby': triggerId }} className="dropdown-menu">
      {children}
    </BaseView>
  );
}

DropdownMenu.propTypes = propTypes;
DropdownMenu.defaultProps = defaultProps;

export default DropdownMenu;
