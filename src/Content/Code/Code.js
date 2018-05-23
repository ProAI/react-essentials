import React from 'react';
import PropTypes from 'prop-types';
import { BaseText } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function Code({ children, ...elementProps }) {
  return (
    <BaseText props={elementProps} tag="code" className="" inlineOnly>
      {children}
    </BaseText>
  );
}

Code.propTypes = propTypes;

export default Code;
