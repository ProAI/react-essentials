import React from 'react';
import PropTypes from 'prop-types';
import CollapseContext from './CollapseContext';
import useCollapse from './useCollapse';

const propTypes = {
  children: PropTypes.node.isRequired,
  defaultVisible: PropTypes.string,
  visible: PropTypes.string,
  onToggle: PropTypes.func,
};

const CollapseProvider = (props) => {
  const { children, defaultVisible = false, visible, onToggle } = props;

  const collapse = useCollapse(defaultVisible, visible, onToggle);

  return (
    <CollapseContext.Provider value={collapse}>
      {children}
    </CollapseContext.Provider>
  );
};

CollapseProvider.displayName = 'CollapseProvider';
CollapseProvider.propTypes = propTypes;

export default CollapseProvider;
