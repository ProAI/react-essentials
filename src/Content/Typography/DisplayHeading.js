import React from 'react';
import PropTypes from 'prop-types';
import BaseText from '../../utils/rnw-compat/BaseText';
import { DISPLAY_HEADING_SIZES } from '../../utils/constants';

const propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(DISPLAY_HEADING_SIZES).isRequired,
};

function DisplayHeading({ size, ...elementProps }) {
  return (
    <BaseText
      {...elementProps}
      accessibilityRole="heading"
      essentials={{ className: `display-${size.toString()}`, blockOnly: true }}
    />
  );
}

DisplayHeading.propTypes = propTypes;

export default DisplayHeading;
