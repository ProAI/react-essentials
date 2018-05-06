import React from 'react';
import PropTypes from 'prop-types';
import { BaseText } from '../../utils/components';
import { HEADING_SIZES } from '../../utils/constants';

const propTypes = {
  size: PropTypes.oneOf(HEADING_SIZES).isRequired,
};

function Heading({ size, ...elementProps }) {
  return <BaseText props={elementProps} tag={`h${size.toString()}`} className="" blockOnly />;
}

Heading.propTypes = propTypes;

export default Heading;
