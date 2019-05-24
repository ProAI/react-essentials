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

const defaultProps = {
  onPress: null,
  onChange: null,
  active: null,
};

const TabsNavTab = React.forwardRef(function TabsNavTab(props, ref) {
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
    'nav-link',
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
      essentials={{
        tag: 'a',
        className: classes,
      }}
    />
  );
});

TabsNavTab.displayName = 'TabsNavTab';
TabsNavTab.propTypes = propTypes;
TabsNavTab.defaultProps = defaultProps;

export default TabsNavTab;
