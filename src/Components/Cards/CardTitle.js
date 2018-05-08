import React from 'react';
import PropTypes from 'prop-types';
import { BaseText } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function CardTitle({ children, ...elementProps }) {
  return (
    <BaseText tag="h5" props={elementProps} className="card-title" blockOnly>
      {children}
    </BaseText>
  );
}

CardTitle.propTypes = propTypes;

export default CardTitle;
