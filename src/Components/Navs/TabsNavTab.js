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

function TabsNavTab(props) {
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
}

TabsNavTab.propTypes = propTypes;
TabsNavTab.defaultProps = defaultProps;

export default TabsNavTab;
