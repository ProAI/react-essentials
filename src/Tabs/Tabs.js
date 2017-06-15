import React from 'react';
import PropTypes from 'prop-types';
import TabsNav from './TabsNav';
import TabsContent from './TabsContent';
import TabsPane from './TabsPane';
import IdentifierGenerator from '../shared/IdentifierGenerator';

const propTypes = {
  children: PropTypes.node.isRequired,
  defaultActiveKey: PropTypes.string,
  variant: PropTypes.oneOf(['basic', 'tabs', 'pills']),
};

const defaultProps = {
  className: null,
  defaultActiveKey: null,
  variant: 'tabs',
};

class Tabs extends React.Component {
  static Pane = props => <TabsPane {...props} />;

  constructor(props) {
    super(props);

    this.genIdentifier = IdentifierGenerator.generate('gen-tabs-');
    this.state = {
      activeKey:
        this.props.defaultActiveKey || this.props.children[0].props.id || `${this.genIdentifier}-0`,
    };
  }

  onChange = (event, key) => {
    this.setState({
      activeKey: key,
    });
  };

  render() {
    const { children, defaultActiveKey, variant, ...attributes } = this.props;

    const tabsNavLinkChildren = React.Children.map(children, (child, i) => {
      const linkedPaneId = child.props.id || `${this.genIdentifier}-${i}`;

      return <TabsNav.Link toPane={linkedPaneId}>{child.props.label}</TabsNav.Link>;
    });

    const tabsContentPaneChildren = React.Children.map(children, (child, i) => {
      const paneId = child.props.id || `${this.genIdentifier}-${i}`;

      return React.cloneElement(child, {
        id: paneId,
      });
    });

    return (
      <div {...attributes}>
        <TabsNav activeKey={this.state.activeKey} onChange={this.onChange}>
          {tabsNavLinkChildren}
        </TabsNav>
        <TabsContent activeKey={this.state.activeKey}>
          {tabsContentPaneChildren}
        </TabsContent>
      </div>
    );
  }
}

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;

export default Tabs;
