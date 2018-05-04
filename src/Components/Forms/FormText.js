import React from 'react';
import { BaseText } from '../../utils/components';

function FormText({ ...otherProps }) {
  return <BaseText {...otherProps} className="form-text" />;
}

export default FormText;
