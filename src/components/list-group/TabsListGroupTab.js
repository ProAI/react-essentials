import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseTouchable from '../../utils/rnw-compat/BaseTouchable';

const propTypes = {
  children: PropTypes.node.isRequired,
  toPane: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  onChange: PropTypes.func,
  active: PropTypes.bool,
};

const TabsListGroupTab = React.forwardRef(function TabsListGroupTab(
  props,
  ref,
) {
  const { onPress, onChange, toPane, active, ...elementProps } = props;

  const handlePress = event => {
    event.preventDefault();

    if (onPress) {
      onPress(event);
    }

    onChange(toPane, event);
  };

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
      ref={ref}
      accessibilityRole="tab"
      href={`#${toPane}`}
      onPress={handlePress}
      aria-controls={toPane}
      essentials={{ tag: 'a', className: classes }}
    />
  );
});

TabsListGroupTab.displayName = 'TabsListGroupTab';
TabsListGroupTab.propTypes = propTypes;

export default TabsListGroupTab;
