import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function CardFooter({ children, ...elementProps }) {
  return (
    <BaseView props={elementProps} className="card-footer">
      {children}
    </BaseView>
  );
}

CardFooter.propTypes = propTypes;

export default CardFooter;
