import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';
import BlockquoteFooter from './BlockquoteFooter';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Blockquote = React.forwardRef((props, ref) => (
  <BaseView
    {...props}
    ref={ref}
    essentials={{ tag: 'blockquote', className: 'blockquote' }}
  />
));

Blockquote.displayName = 'Blockquote';
Blockquote.propTypes = propTypes;

Blockquote.Footer = BlockquoteFooter;

export default Blockquote;
