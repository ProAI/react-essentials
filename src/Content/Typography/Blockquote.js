import React from 'react';
import { BaseView } from '../../utils/components';
import BlockquoteFooter from './BlockquoteFooter';

function Blockquote({ ...otherProps }) {
  return <BaseView {...otherProps} tag="blockquote" className="blockquote" />;
}

Blockquote.Footer = BlockquoteFooter;

export default Blockquote;
