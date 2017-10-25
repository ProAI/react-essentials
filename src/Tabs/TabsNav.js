import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import TabsLink from './TabsLink';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  activeKey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['basic', 'tabs', 'pills']),
  stacked: PropTypes.bool,
};

const defaultProps = {
  className: null,
  variant: 'tabs',
  stacked: false,
};

class TabsNav extends React.Component {
  static Link = props => <TabsLink {...props} />;

  render() {
    const {
      children,
      className,
      activeKey,
      onChange,
      variant,
      stacked,
      ...attributes
    } = this.props;

    // create component classes
    const classes = cx(
      'nav',
      { 'nav-tabs': variant === 'tabs' },
      { 'nav-pills': variant === 'pills' },
      { 'flex-column': stacked },
      className,
    );

    const manipulatedChildren = React.Children.map(children, child =>
      React.cloneElement(child, {
        active: activeKey === child.props.toPane,
        onChange,
      }));

    return (
      <ul role="tablist" className={classes} {...attributes}>
        {manipulatedChildren}
      </ul>
    );
  }
}

TabsNav.propTypes = propTypes;
TabsNav.defaultProps = defaultProps;

export default TabsNav;
