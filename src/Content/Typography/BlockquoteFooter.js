import React from 'react';
import { BaseView } from '../../utils/components';

function BlockquoteFooter({ ...elementProps }) {
  return <BaseView props={elementProps} tag="footer" className="blockquote-footer" />;
}

export default BlockquoteFooter;
