import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';

import TabsContentPane from './TabsContentPane';

const propTypes = {
  children: PropTypes.node.isRequired,
  activeKey: PropTypes.string.isRequired,
};

function TabsContent({ children, activeKey, ...elementProps }) {
  const manipulatedChildren = React.Children.map(children, child =>
    React.cloneElement(child, {
      active: activeKey === child.props.id,
    }));

  return (
    <BaseView props={elementProps} className="tab-content">
      {manipulatedChildren}
    </BaseView>
  );
}

TabsContent.propTypes = propTypes;

TabsContent.Pane = TabsContentPane;

export default TabsContent;
