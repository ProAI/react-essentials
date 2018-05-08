import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseView } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
};

const defaultProps = {
  active: false,
};

function TabsContentPane({ children, active, ...elementProps }) {
  const classes = cx(
    // constant classes
    'tab-pane',
    // variable classes
    active && 'active',
  );

  return (
    <BaseView props={{ ...elementProps, role: 'tabpanel' }} className={classes}>
      {children}
    </BaseView>
  );
}

TabsContentPane.propTypes = propTypes;
TabsContentPane.defaultProps = defaultProps;

export default TabsContentPane;
