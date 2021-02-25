import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const TableFooter = React.forwardRef((props, ref) => (
  // TODO: Remove pseudo view and add react-native compatible component
  <BaseView {...props} ref={ref} essentials={{ tag: 'tfoot', pseudo: true }} />
));

TableFooter.displayName = 'TableFooter';
TableFooter.propTypes = propTypes;

export default TableFooter;
