import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function CardHeader({ children, ...elementProps }) {
  return (
    <BaseView props={elementProps} className="card-header">
      {children}
    </BaseView>
  );
}

CardHeader.propTypes = propTypes;

export default CardHeader;
