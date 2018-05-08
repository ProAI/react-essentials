import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';
import TabsNav from './TabsNav';
import TabsNavTab from './TabsNavTab';
import TabsContent from './TabsContent';
import TabsContentPane from './TabsContentPane';

const propTypes = {
  children: PropTypes.node.isRequired,
  defaultActiveKey: PropTypes.string,
  activeKey: PropTypes.string,
  onChange: PropTypes.func,
  variant: PropTypes.oneOf(['tabs', 'pills']),
  stacked: PropTypes.bool,
};

const contextTypes = {
  generateKey: PropTypes.func.isRequired,
};

const defaultProps = {
  defaultActiveKey: null,
  activeKey: null,
  onChange: null,
  variant: 'tabs',
  stacked: false,
};

class Tabs extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.identifier = context.generateKey('re-tabs-');

    if (!props.activeKey) {
      this.state = {
        activeKey: props.defaultActiveKey || props.children[0].props.id || `${this.identifier}-0`,
      };
    }
  }

  onChange = (key) => {
    if (this.props.onChange) {
      this.props.onChange();
    } else {
      this.setState({
        activeKey: key,
      });
    }
  };

  activeKey = () => {
    if (this.props.activeKey) {
      return this.props.activeKey;
    }

    return this.state.activeKey;
  };

  render() {
    const {
      children,
      defaultActiveKey,
      activeKey,
      onChange,
      variant,
      stacked,
      ...elementProps
    } = this.props;

    const tabsNavLinkChildren = React.Children.map(children, (child, i) => {
      const linkedPaneId = child.props.id || `${this.identifier}-${i}`;

      return <TabsNavTab toPane={linkedPaneId}>{child.props.label}</TabsNavTab>;
    });

    const tabsContentPaneChildren = React.Children.map(children, (child, i) => {
      const paneId = child.props.id || `${this.identifier}-${i}`;

      return React.cloneElement(child, {
        id: paneId,
      });
    });

    return (
      <BaseView props={elementProps} className="">
        <TabsNav
          activeKey={this.activeKey()}
          onChange={this.onChange}
          variant={variant}
          stacked={stacked}
        >
          {tabsNavLinkChildren}
        </TabsNav>
        <TabsContent activeKey={this.activeKey()}>{tabsContentPaneChildren}</TabsContent>
      </BaseView>
    );
  }
}

Tabs.propTypes = propTypes;
Tabs.contextTypes = contextTypes;
Tabs.defaultProps = defaultProps;

Tabs.Pane = TabsContentPane;

export default Tabs;
