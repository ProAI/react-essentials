import React from 'react';
import { BaseView } from '../../utils/components';
import BlockquoteFooter from './BlockquoteFooter';

function Blockquote({ ...elementProps }) {
  return <BaseView props={elementProps} tag="blockquote" className="blockquote" />;
}

Blockquote.Footer = BlockquoteFooter;

export default Blockquote;
