import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function List(elementProps) {
  // TODO: Remove pseudo view and add react-native compatible component
  return (
    <BaseView
      {...elementProps}
      accessibilityRole="listitem"
      essentials={{ pseudo: true }}
    />
  );
}

List.propTypes = propTypes;

export default List;
