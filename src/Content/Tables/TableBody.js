import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const TableBody = React.forwardRef(function TableBody(props, ref) {
  // TODO: Remove pseudo view and add react-native compatible component
  return (
    <BaseView
      {...props}
      ref={ref}
      essentials={{ tag: 'tbody', pseudo: true }}
    />
  );
});

TableBody.propTypes = propTypes;

export default TableBody;
