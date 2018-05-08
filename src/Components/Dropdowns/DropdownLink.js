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

function DropdownLink(props, context) {
  const { children, ...elementProps } = props;

  const linkProps = action.createLinkProps(elementProps, context);

  return (
    <BaseText {...linkProps} className="dropdown-item" blockOnly>
      {children}
    </BaseText>
  );
}

DropdownLink.propTypes = propTypes;
DropdownLink.contextTypes = contextTypes;
DropdownLink.defaultProps = defaultProps;

export default DropdownLink;
