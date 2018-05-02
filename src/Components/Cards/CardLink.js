import React from 'react';
import { BaseText } from '../../utils/components';
import { action } from '../../utils';

const propTypes = {
  ...action.propTypes,
};

const defaultProps = {
  ...action.defaultProps,
};

function CardLink(props, context) {
  const { ...otherProps } = props;

  const linkProps = action.createLinkProps(otherProps, context);

  return <BaseText {...linkProps} className="card-link" blockOnly />;
}

CardLink.propTypes = propTypes;
CardLink.defaultProps = defaultProps;

export default CardLink;
