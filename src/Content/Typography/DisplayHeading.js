import React from 'react';
import PropTypes from 'prop-types';
import { BaseText } from '../../utils/components';
import { DISPLAY_HEADING_SIZES } from '../../utils/constants';

const propTypes = {
  size: PropTypes.oneOf(DISPLAY_HEADING_SIZES).isRequired,
};

function DisplayHeading({ size, ...elementProps }) {
  return <BaseText props={elementProps} tag="h1" className={`display-${size}`} blockOnly />;
}

DisplayHeading.propTypes = propTypes;

export default DisplayHeading;
