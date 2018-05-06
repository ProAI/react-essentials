import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseView } from '../../utils/components';
import TabsNavLink from './TabsNavLink';

const propTypes = {
  children: PropTypes.node.isRequired,
  activeKey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['basic', 'tabs', 'pills']),
  stacked: PropTypes.bool,
};

const defaultProps = {
  variant: 'tabs',
  stacked: false,
};

function TabsNav({
  children, activeKey, onChange, variant, stacked, ...elementProps
}) {
  const classes = cx(
    // constant classes
    'nav',
    // variable classes
    variant === 'tabs' && 'nav-tabs',
    variant === 'pills' && 'nav-pills',
    stacked && 'flex-column',
  );

  const manipulatedChildren = React.Children.map(children, child =>
    React.cloneElement(child, {
      active: activeKey === child.props.toPane,
      onChange,
    }));

  return (
    <BaseView props={elementProps} tag="nav" role="tablist" className={classes}>
      {manipulatedChildren}
    </BaseView>
  );
}

TabsNav.propTypes = propTypes;
TabsNav.defaultProps = defaultProps;

TabsNav.Link = TabsNavLink;

export default TabsNav;
