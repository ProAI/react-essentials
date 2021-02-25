import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const InputGroupPrepend = React.forwardRef((props, ref) => (
  <BaseView
    {...props}
    ref={ref}
    essentials={{ className: 'input-group-prepend' }}
  />
));

InputGroupPrepend.displayName = 'InputGroupPrepend';
InputGroupPrepend.propTypes = propTypes;

export default InputGroupPrepend;
