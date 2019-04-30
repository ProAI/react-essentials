import React from 'react';
import PropTypes from 'prop-types';
import BaseText from '../../utils/rnw-compat/BaseText';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function Cite(elementProps) {
  return (
    <BaseText
      {...elementProps}
      essentials={{ tag: 'cite', inlineOnly: true }}
    />
  );
}

Cite.propTypes = propTypes;

export default Cite;
