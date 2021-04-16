import React from 'react';
import PropTypes from 'prop-types';
import CollapseContext from './CollapseContext';
import useCollapseState from './useCollapseState';

const propTypes = {
  children: PropTypes.node.isRequired,
  defaultVisible: PropTypes.string,
  visible: PropTypes.string,
  onToggle: PropTypes.func,
};

const CollapseProvider = (props) => {
  const { children, defaultVisible = false, visible, onToggle } = props;

  const state = useCollapseState(defaultVisible, visible, onToggle);

  return (
    <CollapseContext.Provider value={state}>
      {children}
    </CollapseContext.Provider>
  );
};

CollapseProvider.displayName = 'CollapseProvider';
CollapseProvider.propTypes = propTypes;

export default CollapseProvider;
