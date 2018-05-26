import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function TableData({ children, ...elementProps }) {
  // TODO: Remove pseudo view and add react-native compatible component
  return (
    <BaseView pseudo tag="td" props={elementProps} className="">
      {children}
    </BaseView>
  );
}

TableData.propTypes = propTypes;

export default TableData;
