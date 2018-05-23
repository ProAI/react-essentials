import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseView, BaseText } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
  toPane: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  active: PropTypes.bool,
};

const defaultProps = {
  onClick: null,
  onChange: null,
  active: null,
};

class TabsListGroupTab extends React.Component {
  onClick = (event) => {
    event.preventDefault();

    if (this.props.onClick) {
      this.props.onClick(event);
    }

    this.props.onChange(this.props.toPane, event);
  };

  render() {
    const {
      children, onClick, toPane, active, ...elementProps
    } = this.props;

    const linkClasses = cx(
      // constant classes
      'list-group-item',
      'list-group-item-action',
      // variable classes
      active && 'active',
    );

    return (
      <BaseView
        tag="a"
        props={{
          ...elementProps,
          role: 'tab',
          href: `#${toPane}`,
          onClick: this.onClick,
          'aria-controls': toPane,
        }}
        className={linkClasses}
      >
        <BaseText className="" blockOnly>
          {children}
        </BaseText>
      </BaseView>
    );
  }
}

TabsListGroupTab.propTypes = propTypes;
TabsListGroupTab.defaultProps = defaultProps;

export default TabsListGroupTab;
