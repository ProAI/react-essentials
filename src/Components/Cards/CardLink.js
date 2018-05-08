import React from 'react';
import PropTypes from 'prop-types';
import { BaseText } from '../../utils/components';
import { action } from '../../utils';

const propTypes = {
  ...action.propTypes,
  children: PropTypes.node.isRequired,
};

const defaultProps = {
  ...action.defaultProps,
};

function CardLink(props, context) {
  const { children, ...elementProps } = props;

  const linkProps = action.createLinkProps(elementProps, context);

  return (
    <BaseText {...linkProps} className="card-link" blockOnly>
      {children}
    </BaseText>
  );
}

CardLink.propTypes = propTypes;
CardLink.defaultProps = defaultProps;

export default CardLink;
