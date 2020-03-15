import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const InputGroupAppend = React.forwardRef(function InputGroupAppend(
  props,
  ref,
) {
  return (
    <BaseView
      {...props}
      ref={ref}
      essentials={{ className: 'input-group-append' }}
    />
  );
});

InputGroupAppend.displayName = 'InputGroupAppend';
InputGroupAppend.propTypes = propTypes;

export default InputGroupAppend;
