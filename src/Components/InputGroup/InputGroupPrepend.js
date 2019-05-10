import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const InputGroupPrepend = React.forwardRef(function InputGroupPrepend(
  props,
  ref,
) {
  return (
    <BaseView
      {...props}
      ref={ref}
      essentials={{ className: 'input-group-prepend' }}
    />
  );
});

InputGroupPrepend.propTypes = propTypes;

export default InputGroupPrepend;
