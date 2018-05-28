import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';
import InputGroupAppend from './InputGroupAppend';
import InputGroupPrepend from './InputGroupPrepend';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function InputGroup({ children, ...elementProps }) {
  return (
    <BaseView props={elementProps} className="input-group">
      {children}
    </BaseView>
  );
}

InputGroup.propTypes = propTypes;

InputGroup.Append = InputGroupAppend;
InputGroup.Prepend = InputGroupPrepend;

export default InputGroup;
