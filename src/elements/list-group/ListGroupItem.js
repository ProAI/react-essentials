import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

const ListGroupItem = React.forwardRef(function ListGroupItem(props, ref) {
  const { disabled = false, ...elementProps } = props;

  const classes = cx(
    // constant classes
    'list-group-item',
    // variable classes
    disabled && 'disabled',
  );

  return (
    <BaseView
      {...elementProps}
      ref={ref}
      accessibilityRole="listitem"
      essentials={{ className: classes }}
    />
  );
});

ListGroupItem.displayName = 'ListGroupItem';
ListGroupItem.propTypes = propTypes;

export default ListGroupItem;
