import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function TableHeading(elementProps) {
  // TODO: Remove pseudo view and add react-native compatible component
  return (
    <BaseView {...elementProps} essentials={{ tag: 'th', pseudo: true }} />
  );
}

TableHeading.propTypes = propTypes;

export default TableHeading;
