import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import TabsPane from './TabsPane';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  activeKey: PropTypes.string.isRequired,
};

const defaultProps = {
  className: null,
};

class TabsContent extends React.Component {
  static Pane = props => <TabsPane {...props} />;

  render() {
    const {
      children, className, activeKey, ...attributes
    } = this.props;

    // create component classes
    const classes = cx('tab-content', className);

    const manipulatedChildren = React.Children.map(children, child =>
      React.cloneElement(child, {
        active: activeKey === child.props.id,
      }));

    return (
      <div className={classes} {...attributes}>
        {manipulatedChildren}
      </div>
    );
  }
}

TabsContent.propTypes = propTypes;
TabsContent.defaultProps = defaultProps;

export default TabsContent;
