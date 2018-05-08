import React from 'react';
import PropTypes from 'prop-types';
import { BaseText } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function CardSubtitle({ children, ...elementProps }) {
  return (
    <BaseText tag="h6" props={elementProps} className="card-subtitle" blockOnly>
      {children}
    </BaseText>
  );
}

CardSubtitle.propTypes = propTypes;

export default CardSubtitle;
