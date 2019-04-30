import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseView from '../../utils/rnw-compat/BaseView';
import TabsListGroupTab from './TabsListGroupTab';

const propTypes = {
  children: PropTypes.node.isRequired,
  activeKey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  flush: PropTypes.bool,
};

const defaultProps = {
  flush: false,
};

function TabsListGroup({
  children,
  activeKey,
  onChange,
  flush,
  ...elementProps
}) {
  const classes = cx(
    // constant classes
    'list-group',
    // variable classes
    flush && 'list-group-flush',
  );

  const manipulatedChildren = React.Children.map(children, child =>
    React.cloneElement(child, {
      active: activeKey === child.props.toPane,
      onChange,
    }),
  );

  return (
    <BaseView
      {...elementProps}
      accessibilityRole="tablist"
      essentials={{ className: classes }}
    >
      {manipulatedChildren}
    </BaseView>
  );
}

TabsListGroup.propTypes = propTypes;
TabsListGroup.defaultProps = defaultProps;

TabsListGroup.Tab = TabsListGroupTab;

export default TabsListGroup;
