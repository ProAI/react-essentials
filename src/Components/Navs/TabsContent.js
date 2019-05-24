import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';
import TabsContentPane from './TabsContentPane';

const propTypes = {
  children: PropTypes.node.isRequired,
  activeKey: PropTypes.string.isRequired,
};

const TabsContent = React.forwardRef(function TabsContent(props, ref) {
  const { children, activeKey, ...elementProps } = props;

  const clonedChildren = React.Children.map(children, child => {
    const active = activeKey === child.props.id;

    return active ? child : null;
  });

  return (
    <BaseView
      {...elementProps}
      ref={ref}
      essentials={{ className: 'tab-content' }}
    >
      {clonedChildren}
    </BaseView>
  );
});

TabsContent.displayName = 'TabsContent';
TabsContent.propTypes = propTypes;

TabsContent.Pane = TabsContentPane;

export default TabsContent;
