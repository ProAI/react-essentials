import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';
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
    <BaseView {...linkProps} className="dropdown-item" blockOnly>
      {children}
    </BaseView>
  );
}

DropdownItem.propTypes = propTypes;
DropdownItem.contextTypes = contextTypes;
DropdownItem.defaultProps = defaultProps;

export default DropdownItem;
