import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseText } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

const defaultProps = {
  disabled: false,
};

function ListGroupItem({ children, disabled, ...elementProps }) {
  const classes = cx(
    // constant classes
    'list-group-item',
    // variable classes
    disabled && 'disabled',
  );

  return (
    <BaseText tag="li" props={elementProps} className={classes} blockOnly>
      {children}
    </BaseText>
  );
}

ListGroupItem.propTypes = propTypes;
ListGroupItem.defaultProps = defaultProps;

export default ListGroupItem;
