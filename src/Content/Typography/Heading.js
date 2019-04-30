import React from 'react';
import PropTypes from 'prop-types';
import BaseText from '../../utils/rnw-compat/BaseText';
import { HEADING_SIZES } from '../../utils/constants';

const propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(HEADING_SIZES).isRequired,
};

function Heading({ size, ...elementProps }) {
  return (
    <BaseText
      {...elementProps}
      essentials={{ tag: `h${size.toString()}`, blockOnly: true }}
    />
  );
}

Heading.propTypes = propTypes;

export default Heading;
