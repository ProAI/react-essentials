import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  active: PropTypes.bool.isRequired,
};

const defaultProps = {
  className: null,
};

function TabsPane({ children, className, active, ...attributes }) {
  const classes = cx('tab-pane', { active }, className);

  return (
    <div role="tabpanel" className={classes} {...attributes}>
      {children}
    </div>
  );
}

TabsPane.propTypes = propTypes;
TabsPane.defaultProps = defaultProps;

export default TabsPane;
