import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseView } from '../../utils/components';

const propTypes = {
  active: PropTypes.bool,
};

const defaultProps = {
  active: false,
};

function TabsContentPane({ active, ...elementProps }) {
  const classes = cx(
    // constant classes
    'tab-pane',
    // variable classes
    active && 'active',
  );

  return <BaseView props={elementProps} role="tabpanel" className={classes} />;
}

TabsContentPane.propTypes = propTypes;
TabsContentPane.defaultProps = defaultProps;

export default TabsContentPane;
