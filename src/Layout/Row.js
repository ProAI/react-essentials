import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function Row({ children }) {
  return (
    <div className="row">
      {children}
    </div>
  );
}

Row.propTypes = propTypes;

export default Row;
