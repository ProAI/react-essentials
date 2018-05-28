import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function InputGroupPrepend({ children, ...elementProps }) {
  return (
    <BaseView props={elementProps} className="input-group-prepend">
      {children}
    </BaseView>
  );
}

InputGroupPrepend.propTypes = propTypes;

export default InputGroupPrepend;
