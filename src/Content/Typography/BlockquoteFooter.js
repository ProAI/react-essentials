import React from 'react';
import { BaseView } from '../../utils/components';

function BlockquoteFooter({ ...elementProps }) {
  return <BaseView elementProps={elementProps} tag="footer" className="blockquote-footer" />;
}

export default BlockquoteFooter;
