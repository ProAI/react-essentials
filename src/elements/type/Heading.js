import React from 'react';
import PropTypes from 'prop-types';
import BaseText from '../../utils/rnw-compat/BaseText';
import { HEADING_SIZES } from '../../utils/constants';

const propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(HEADING_SIZES).isRequired,
};

const Heading = React.forwardRef(function Heading(props, ref) {
  const { size, ...elementProps } = props;

  return (
    <BaseText
      {...elementProps}
      ref={ref}
      accessibilityRole="heading"
      aria-level={size}
      essentials={{ blockOnly: true }}
    />
  );
});

Heading.displayName = 'Heading';
Heading.propTypes = propTypes;

export default Heading;
