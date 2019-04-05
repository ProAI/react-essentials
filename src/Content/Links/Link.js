import React from 'react';
import PropTypes from 'prop-types';
import { BaseText } from '../../utils/components';
import action from '../../utils/action';

const propTypes = {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  ...action.propTypes,
  children: PropTypes.node.isRequired,
};

const defaultProps = {
  ...action.defaultProps,
};

function Link(props) {
  const { children, ...elementProps } = props;

  const linkProps = action.createLinkProps(elementProps);

  return (
    <BaseText {...linkProps} className="">
      {children}
    </BaseText>
  );
}

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;
