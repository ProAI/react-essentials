import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function InputGroupPrepend(elementProps) {
  return (
    <BaseView
      {...elementProps}
      essentials={{ className: 'input-group-prepend' }}
    />
  );
}

InputGroupPrepend.propTypes = propTypes;

export default InputGroupPrepend;
