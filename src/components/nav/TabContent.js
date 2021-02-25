import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const TabContent = React.forwardRef((props, ref) => {
  const { ...elementProps } = props;

  return (
    <BaseView
      {...elementProps}
      ref={ref}
      essentials={{ className: 'tab-content' }}
    />
  );
});

TabContent.displayName = 'TabContent';
TabContent.propTypes = propTypes;

export default TabContent;
