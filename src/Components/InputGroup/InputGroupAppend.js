import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function InputGroupAppend(elementProps) {
  return (
    <BaseView
      {...elementProps}
      essentials={{ className: 'input-group-append' }}
    />
  );
}

InputGroupAppend.propTypes = propTypes;

export default InputGroupAppend;
