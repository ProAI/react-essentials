import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const TableHeader = React.forwardRef((props, ref) => (
  // TODO: Remove pseudo view and add react-native compatible component
  <BaseView {...props} ref={ref} essentials={{ tag: 'thead', pseudo: true }} />
));

TableHeader.displayName = 'TableHeader';
TableHeader.propTypes = propTypes;

export default TableHeader;
