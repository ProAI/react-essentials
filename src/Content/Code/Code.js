import React from 'react';
import PropTypes from 'prop-types';
import BaseText from '../../utils/rnw-compat/BaseText';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function Code(elementProps) {
  return (
    <BaseText
      {...elementProps}
      essentials={{ tag: 'code', inlineOnly: true }}
    />
  );
}

Code.propTypes = propTypes;

export default Code;
