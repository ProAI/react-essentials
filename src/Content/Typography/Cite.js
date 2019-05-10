import React from 'react';
import PropTypes from 'prop-types';
import BaseText from '../../utils/rnw-compat/BaseText';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Cite = React.forwardRef(function Cite(props, ref) {
  return (
    <BaseText
      {...props}
      ref={ref}
      essentials={{ tag: 'cite', inlineOnly: true }}
    />
  );
});

Cite.propTypes = propTypes;

export default Cite;
