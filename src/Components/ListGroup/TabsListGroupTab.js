import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseTouchable from '../../utils/rnw-compat/BaseTouchable';

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
  onClick = event => {
    event.preventDefault();

    const { props } = this;

    if (props.onClick) {
      props.onClick(event);
    }

    props.onChange(props.toPane, event);
  };

  render() {
    const { onClick, toPane, active, ...elementProps } = this.props;

    const classes = cx(
      // constant classes
      'list-group-item',
      'list-group-item-action',
      // variable classes
      active && 'active',
    );

    return (
      <BaseTouchable
        {...elementProps}
        accessibilityRole="tab"
        href={`#${toPane}`}
        onClick={this.onClick}
        aria-controls={toPane}
        essentials={{ tag: 'a', className: classes }}
      />
    );
  }
}

TabsListGroupTab.propTypes = propTypes;
TabsListGroupTab.defaultProps = defaultProps;

export default TabsListGroupTab;
