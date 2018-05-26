import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseView } from '../../utils/components';

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

class TabsNavTab extends React.Component {
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
      'nav-link',
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
        {children}
      </BaseView>
    );
  }
}

TabsNavTab.propTypes = propTypes;
TabsNavTab.defaultProps = defaultProps;

export default TabsNavTab;
