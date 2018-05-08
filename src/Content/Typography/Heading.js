import React from 'react';
import PropTypes from 'prop-types';
import { BaseText } from '../../utils/components';
import { HEADING_SIZES } from '../../utils/constants';

const propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(HEADING_SIZES).isRequired,
};

function Heading({ children, size, ...elementProps }) {
  return (
    <BaseText props={elementProps} tag={`h${size.toString()}`} className="" blockOnly>
      {children}
    </BaseText>
  );
}

Heading.propTypes = propTypes;

export default Heading;
