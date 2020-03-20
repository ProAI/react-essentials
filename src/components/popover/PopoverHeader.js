import React from 'react';
import PropTypes from 'prop-types';
import BaseText from '../../utils/rnw-compat/BaseText';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const PopoverHeader = React.forwardRef(function PopoverHeader(props, ref) {
  return (
    <BaseText
      {...props}
      ref={ref}
      accessibilityRole="heading"
      aria-level={3}
      essentials={{
        className: 'popover-header',
        blockOnly: true,
      }}
    />
  );
});

PopoverHeader.displayName = 'PopoverHeader';
PopoverHeader.propTypes = propTypes;

export default PopoverHeader;
