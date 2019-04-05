import React from 'react';
import PropTypes from 'prop-types';
import { BaseTouchable } from '../../utils/components';
import action from '../../utils/action';

const propTypes = {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  ...action.propTypes,
  children: PropTypes.node.isRequired,
};

const defaultProps = {
  ...action.defaultProps,
};

function DropdownItem(props) {
  const { children, ...elementProps } = props;

  const linkProps = action.createLinkProps(elementProps);

  return (
    <BaseTouchable {...linkProps} className="dropdown-item" blockOnly>
      {children}
    </BaseTouchable>
  );
}

DropdownItem.propTypes = propTypes;
DropdownItem.defaultProps = defaultProps;

export default DropdownItem;
