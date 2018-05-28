import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function InputGroupAppend({ children, ...elementProps }) {
  return (
    <BaseView props={elementProps} className="input-group-append">
      {children}
    </BaseView>
  );
}

InputGroupAppend.propTypes = propTypes;

export default InputGroupAppend;
