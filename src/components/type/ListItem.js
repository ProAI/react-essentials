import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const ListItem = React.forwardRef(function ListItem(props, ref) {
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

ListItem.displayName = 'ListItem';
ListItem.propTypes = propTypes;

export default ListItem;
