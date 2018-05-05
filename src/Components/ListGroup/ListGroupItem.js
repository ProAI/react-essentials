import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseText } from '../../utils/components';

const propTypes = {
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

  return <BaseText elementProps={elementProps} tag="li" className={classes} blockOnly />;
}

ListGroupItem.propTypes = propTypes;
ListGroupItem.defaultProps = defaultProps;

export default ListGroupItem;