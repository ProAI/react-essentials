import React from 'react';
import PropTypes from 'prop-types';
import BaseText from '../../utils/rnw-compat/BaseText';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const CodeBlock = React.forwardRef(function CodeBlock(props, ref) {
  const { children, ...elementProps } = props;

  return (
    <BaseText
      {...elementProps}
      ref={ref}
      essentials={{ tag: 'pre', blockOnly: true }}
    >
      <BaseText essentials={{ tag: 'code' }}>{children}</BaseText>
    </BaseText>
  );
});

CodeBlock.displayName = 'CodeBlock';
CodeBlock.propTypes = propTypes;

export default CodeBlock;
