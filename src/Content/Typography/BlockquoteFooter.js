import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function BlockquoteFooter(elementProps) {
  return (
    <BaseView
      {...elementProps}
      essentials={{ tag: 'footer', className: 'blockquote-footer' }}
    />
  );
}

BlockquoteFooter.propTypes = propTypes;

export default BlockquoteFooter;
