import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
};

const defaultProps = {
  active: false,
};

function TabsContentPane({ children, active, ...elementProps }) {
  return (
    <BaseView props={{ ...elementProps, role: 'tabpanel' }} className="tab-pane">
      {children}
    </BaseView>
  );
}

TabsContentPane.propTypes = propTypes;
TabsContentPane.defaultProps = defaultProps;

export default TabsContentPane;
