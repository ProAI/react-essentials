import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';
import BlockquoteFooter from './BlockquoteFooter';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function Blockquote({ children, ...elementProps }) {
  return (
    <BaseView props={elementProps} tag="blockquote" className="blockquote">
      {children}
    </BaseView>
  );
}

Blockquote.propTypes = propTypes;

Blockquote.Footer = BlockquoteFooter;

export default Blockquote;
