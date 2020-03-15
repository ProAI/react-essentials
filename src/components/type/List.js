import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseView from '../../utils/rnw-compat/BaseView';
import ListItem from './ListItem';

const propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['unordered', 'ordered']),
  unstyled: PropTypes.bool,
  inline: PropTypes.bool,
};

const List = React.forwardRef(function List(props, ref) {
  const {
    variant = 'unordered',
    unstyled = false,
    inline = false,
    ...elementProps
  } = props;

  const classes = cx(
    // variable classes
    unstyled && 'list-unstyled',
    inline && 'list-inline',
  );

  // TODO: Remove pseudo view and add react-native compatible component
  return (
    <BaseView
      {...elementProps}
      ref={ref}
      accessibilityRole="list"
      essentials={{
        tag: variant === 'unordered' ? 'ul' : 'ol',
        className: classes,
        pseudo: true,
      }}
    />
  );
});

List.displayName = 'List';
List.propTypes = propTypes;

List.Item = ListItem;

export default List;
