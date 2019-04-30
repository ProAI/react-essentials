import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function BlockCode({ children, ...elementProps }) {
  return (
    <BaseView {...elementProps} essentials={{ tag: 'pre' }}>
      <BaseView {...elementProps} essentials={{ tag: 'code' }}>
        {children}
      </BaseView>
    </BaseView>
  );
}

BlockCode.propTypes = propTypes;

export default BlockCode;
