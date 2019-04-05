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

function BlockLink(props) {
  const { children, ...elementProps } = props;

  const linkProps = action.createLinkProps(elementProps);

  return (
    <BaseTouchable {...linkProps} className="">
      {children}
    </BaseTouchable>
  );
}

BlockLink.propTypes = propTypes;
BlockLink.defaultProps = defaultProps;

export default BlockLink;
