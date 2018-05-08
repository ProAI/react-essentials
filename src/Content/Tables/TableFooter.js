import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function TableFooter({ children, ...elementProps }) {
  // TODO: Remove pseudo view and add react-native compatible component
  return (
    <BaseView pseudo tag="tfoot" props={elementProps} className="">
      {children}
    </BaseView>
  );
}

TableFooter.propTypes = propTypes;

export default TableFooter;
