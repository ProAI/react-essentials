import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseView } from '../../utils/components';
import ListItem from './ListItem';

const propTypes = {
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
  variant, unstyled, inline, ...elementProps
}) {
  const classes = cx(
    // variable classes
    unstyled && 'list-unstyled',
    inline && 'list-inline',
  );

  // TODO: Remove pseudo view and add react-native compatible component
  return (
    <BaseView
      pseudo
      tag={variant === 'unordered' ? 'ul' : 'ol'}
      props={elementProps}
      className={classes}
    />
  );
}

List.propTypes = propTypes;
List.defaultProps = defaultProps;

List.Item = ListItem;

export default List;
