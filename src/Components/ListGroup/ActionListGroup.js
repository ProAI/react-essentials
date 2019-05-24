import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseView from '../../utils/rnw-compat/BaseView';
import ActionListGroupItem from './ActionListGroupItem';

const propTypes = {
  children: PropTypes.node.isRequired,
  flush: PropTypes.bool,
};

const defaultProps = {
  flush: false,
};

const ActionListGroup = React.forwardRef(function ActionListGroup(props, ref) {
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

ActionListGroup.displayName = 'ActionListGroup';
ActionListGroup.propTypes = propTypes;
ActionListGroup.defaultProps = defaultProps;

ActionListGroup.Item = ActionListGroupItem;

export default ActionListGroup;
