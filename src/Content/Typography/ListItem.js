import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const List = React.forwardRef(function List(props, ref) {
  // TODO: Remove pseudo view and add react-native compatible component
  return (
    <BaseView
      {...props}
      ref={ref}
      accessibilityRole="listitem"
      essentials={{ pseudo: true }}
    />
  );
});

List.propTypes = propTypes;

export default List;
