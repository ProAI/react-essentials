import React from 'react';
import { BaseView } from '../../utils/components';

function BlockquoteFooter({ ...otherProps }) {
  return <BaseView {...otherProps} tag="footer" className="blockquote-footer" />;
}

export default BlockquoteFooter;
