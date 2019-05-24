import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseView from '../../utils/rnw-compat/BaseView';
import TouchableListGroupItem from './TouchableListGroupItem';

const propTypes = {
  children: PropTypes.node.isRequired,
  flush: PropTypes.bool,
};

const defaultProps = {
  flush: false,
};

const TouchableListGroup = React.forwardRef(function TouchableListGroup(
  props,
  ref,
) {
  const { flush, ...elementProps } = props;

  const classes = cx(
    // constant classes
    'list-group',
    // variable classes
    flush && 'list-group-flush',
  );

  return (
    <BaseView {...elementProps} ref={ref} essentials={{ className: classes }} />
  );
});

TouchableListGroup.displayName = 'TouchableListGroup';
TouchableListGroup.propTypes = propTypes;
TouchableListGroup.defaultProps = defaultProps;

TouchableListGroup.Item = TouchableListGroupItem;

export default TouchableListGroup;
