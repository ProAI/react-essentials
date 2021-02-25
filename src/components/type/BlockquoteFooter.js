import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const BlockquoteFooter = React.forwardRef((props, ref) => (
  <BaseView
    {...props}
    ref={ref}
    essentials={{ tag: 'footer', className: 'blockquote-footer' }}
  />
));

BlockquoteFooter.displayName = 'BlockquoteFooter';
BlockquoteFooter.propTypes = propTypes;

export default BlockquoteFooter;
