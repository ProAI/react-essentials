import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';
import BlockquoteFooter from './BlockquoteFooter';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function Blockquote(elementProps) {
  return (
    <BaseView
      {...elementProps}
      essentials={{ tag: 'blockquote', className: 'blockquote' }}
    />
  );
}

Blockquote.propTypes = propTypes;

Blockquote.Footer = BlockquoteFooter;

export default Blockquote;
