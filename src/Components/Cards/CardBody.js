import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function CardBody({ children, ...elementProps }) {
  return (
    <BaseView props={elementProps} className="card-body">
      {children}
    </BaseView>
  );
}

CardBody.propTypes = propTypes;

export default CardBody;
