import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseView } from '../../utils/components';
import { formatChildren } from '../../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  raw: PropTypes.bool,
};

const defaultProps = {
  disabled: false,
  raw: false,
};

function ListGroupItem({
  children, disabled, raw, ...elementProps
}) {
  const classes = cx(
    // constant classes
    'list-group-item',
    // variable classes
    disabled && 'disabled',
  );

  return (
    <BaseView tag="li" props={elementProps} className={classes} blockOnly>
      {formatChildren(children, raw)}
    </BaseView>
  );
}

ListGroupItem.propTypes = propTypes;
ListGroupItem.defaultProps = defaultProps;

export default ListGroupItem;
