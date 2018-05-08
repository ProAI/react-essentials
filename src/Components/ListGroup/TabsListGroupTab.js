import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseText } from '../../utils/components';

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
      <BaseText
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
        {children}
      </BaseText>
    );
  }
}

TabsListGroupTab.propTypes = propTypes;
TabsListGroupTab.defaultProps = defaultProps;

export default TabsListGroupTab;
