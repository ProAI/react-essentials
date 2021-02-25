import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const TableData = React.forwardRef((props, ref) => (
  // TODO: Remove pseudo view and add react-native compatible component
  <BaseView {...props} ref={ref} essentials={{ tag: 'td', pseudo: true }} />
));

TableData.displayName = 'TableData';
TableData.propTypes = propTypes;

export default TableData;
