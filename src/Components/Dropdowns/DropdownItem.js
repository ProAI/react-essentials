import React from 'react';
import PropTypes from 'prop-types';
import { BaseText } from '../../utils/components';
import { action } from '../../utils';

const propTypes = {
  ...action.propTypes,
  children: PropTypes.node.isRequired,
};

const contextTypes = {
  ...action.contextTypes,
};

const defaultProps = {
  ...action.defaultProps,
};

function DropdownItem(props, context) {
  const { children, ...elementProps } = props;

  const linkProps = action.createLinkProps(elementProps, context);

  return (
    <BaseText {...linkProps} className="dropdown-item" blockOnly>
      {children}
    </BaseText>
  );
}

DropdownItem.propTypes = propTypes;
DropdownItem.contextTypes = contextTypes;
DropdownItem.defaultProps = defaultProps;

export default DropdownItem;
