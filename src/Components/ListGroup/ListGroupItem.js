import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

const defaultProps = {
  disabled: false,
};

function ListGroupItem({ disabled, ...elementProps }) {
  const classes = cx(
    // constant classes
    'list-group-item',
    // variable classes
    disabled && 'disabled',
  );

  return (
    <BaseView
      {...elementProps}
      accessibilityRole="listitem"
      essentials={{ className: classes }}
    />
  );
}

ListGroupItem.propTypes = propTypes;
ListGroupItem.defaultProps = defaultProps;

export default ListGroupItem;
