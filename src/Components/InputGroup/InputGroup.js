import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';
import InputGroupAppend from './InputGroupAppend';
import InputGroupPrepend from './InputGroupPrepend';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function InputGroup(elementProps) {
  return (
    <BaseView {...elementProps} essentials={{ className: 'input-group' }} />
  );
}

InputGroup.propTypes = propTypes;

InputGroup.Append = InputGroupAppend;
InputGroup.Prepend = InputGroupPrepend;

export default InputGroup;
