import React from 'react';
import PropTypes from 'prop-types';
import { BaseText } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function Text({ children, ...elementProps }) {
  return (
    <BaseText props={elementProps} className="">
      {children}
    </BaseText>
  );
}

Text.propTypes = propTypes;

export default Text;
