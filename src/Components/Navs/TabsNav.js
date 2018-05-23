import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseView } from '../../utils/components';
import TabsNavTab from './TabsNavTab';

const propTypes = {
  children: PropTypes.node.isRequired,
  activeKey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  pills: PropTypes.bool,
  stacked: PropTypes.bool,
};

const defaultProps = {
  pills: false,
  stacked: false,
};

function TabsNav({
  children, activeKey, onChange, pills, stacked, ...elementProps
}) {
  const classes = cx(
    // constant classes
    'nav',
    // variable classes
    !pills && 'nav-tabs',
    pills && 'nav-pills',
    stacked && 'flex-column',
  );

  const manipulatedChildren = React.Children.map(children, child =>
    React.cloneElement(child, {
      active: activeKey === child.props.toPane,
      onChange,
    }));

  return (
    <BaseView props={{ ...elementProps, role: 'tablist' }} tag="div" className={classes}>
      {manipulatedChildren}
    </BaseView>
  );
}

TabsNav.propTypes = propTypes;
TabsNav.defaultProps = defaultProps;

TabsNav.Tab = TabsNavTab;

export default TabsNav;
