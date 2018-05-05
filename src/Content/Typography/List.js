import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseView } from '../../utils/components';

const propTypes = {
  data: PropTypes.object.isRequired,
  variant: PropTypes.oneOf(['unordered', 'ordered']),
  unstyled: PropTypes.bool,
  inline: PropTypes.bool,
};

const defaultProps = {
  variant: 'unordered',
  unstyled: false,
  inline: false,
};

function List({
  data, variant, unstyled, inline,
}) {
  const classes = cx(
    // variable classes
    unstyled && 'list-unstyled',
    inline && 'list-inline',
  );

  // TODO: apply data

  return <BaseView tag={variant === 'unordered' ? 'ul' : 'ol'} className={classes} />;
}

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;
