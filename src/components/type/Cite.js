import React from 'react';
import PropTypes from 'prop-types';
import BaseText from '../../utils/rnw-compat/BaseText';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Cite = React.forwardRef((props, ref) => (
  <BaseText {...props} ref={ref} essentials={{ tag: 'cite' }} />
));

Cite.displayName = 'Cite';
Cite.propTypes = propTypes;

export default Cite;
