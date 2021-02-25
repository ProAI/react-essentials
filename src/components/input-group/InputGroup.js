import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';
import InputGroupAppend from './InputGroupAppend';
import InputGroupPrepend from './InputGroupPrepend';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const InputGroup = React.forwardRef((props, ref) => (
  <BaseView {...props} ref={ref} essentials={{ className: 'input-group' }} />
));

InputGroup.displayName = 'InputGroup';
InputGroup.propTypes = propTypes;

InputGroup.Append = InputGroupAppend;
InputGroup.Prepend = InputGroupPrepend;

export default InputGroup;
