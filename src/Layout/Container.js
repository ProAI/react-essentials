import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function Container({ children }) {
  return (
    <div className="container">
      {children}
    </div>
  );
}

Container.propTypes = propTypes;

export default Container;
