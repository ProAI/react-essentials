import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const TableFooter = React.forwardRef(function TableFooter(props, ref) {
  // TODO: Remove pseudo view and add react-native compatible component
  return (
    <BaseView
      {...props}
      ref={ref}
      essentials={{ tag: 'tfoot', pseudo: true }}
    />
  );
});

TableFooter.propTypes = propTypes;

export default TableFooter;
