import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';

import TabsContentPane from './TabsContentPane';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  activeKey: PropTypes.string.isRequired,
};

const defaultProps = {
  className: null,
};

function TabsContent({
  children, className, activeKey, ...otherProps
}) {
  const manipulatedChildren = React.Children.map(children, child =>
    React.cloneElement(child, {
      active: activeKey === child.props.id,
    }));

  return (
    <BaseView {...otherProps} className="tab-content">
      {manipulatedChildren}
    </BaseView>
  );
}

TabsContent.propTypes = propTypes;
TabsContent.defaultProps = defaultProps;

TabsContent.Pane = TabsContentPane;

export default TabsContent;
