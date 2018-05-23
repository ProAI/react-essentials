import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseView } from '../../utils/components';
import ActionListGroupItem from './ActionListGroupItem';

const propTypes = {
  children: PropTypes.node.isRequired,
  flush: PropTypes.bool,
};

const defaultProps = {
  flush: false,
};

function ActionListGroup({ children, flush, ...elementProps }) {
  const classes = cx(
    // constant classes
    'list-group',
    // variable classes
    flush && 'list-group-flush',
  );

  return (
    <BaseView tag="div" props={elementProps} className={classes}>
      {children}
    </BaseView>
  );
}

ActionListGroup.propTypes = propTypes;
ActionListGroup.defaultProps = defaultProps;

ActionListGroup.Item = ActionListGroupItem;

export default ActionListGroup;
