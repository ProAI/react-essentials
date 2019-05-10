import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const TableRow = React.forwardRef(function TableRow(props, ref) {
  // TODO: Remove pseudo view and add react-native compatible component
  return (
    <BaseView {...props} ref={ref} essentials={{ tag: 'tr', pseudo: true }} />
  );
});

TableRow.propTypes = propTypes;

export default TableRow;
