import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseView } from '../../utils/components';
import TabsNavTab from './TabsNavTab';

const propTypes = {
  children: PropTypes.node.isRequired,
  activeKey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['tabs', 'pills']),
};

const defaultProps = {
  variant: 'tabs',
};

function TabsNav({
  children, activeKey, onChange, variant, ...elementProps
}) {
  const classes = cx(
    // constant classes
    'nav',
    // variable classes
    variant === 'tabs' && 'nav-tabs',
    variant === 'pills' && 'nav-pills',
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
