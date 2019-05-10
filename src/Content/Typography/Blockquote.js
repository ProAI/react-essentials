import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';
import BlockquoteFooter from './BlockquoteFooter';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Blockquote = React.forwardRef(function Blockquote(props, ref) {
  return (
    <BaseView
      {...props}
      ref={ref}
      essentials={{ tag: 'blockquote', className: 'blockquote' }}
    />
  );
});

Blockquote.propTypes = propTypes;

Blockquote.Footer = BlockquoteFooter;

export default Blockquote;
