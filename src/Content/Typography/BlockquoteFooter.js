import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function BlockquoteFooter({ children, ...elementProps }) {
  return (
    <BaseView props={elementProps} tag="footer" className="blockquote-footer">
      {children}
    </BaseView>
  );
}

BlockquoteFooter.propTypes = propTypes;

export default BlockquoteFooter;
