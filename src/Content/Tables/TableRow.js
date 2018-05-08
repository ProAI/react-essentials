import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function TableRow({ children, ...elementProps }) {
  // TODO: Remove pseudo view and add react-native compatible component
  return (
    <BaseView pseudo tag="tr" props={elementProps} className="">
      {children}
    </BaseView>
  );
}

TableRow.propTypes = propTypes;

export default TableRow;
