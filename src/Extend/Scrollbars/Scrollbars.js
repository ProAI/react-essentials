import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars as ReactScrollbars } from 'react-custom-scrollbars';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function Scrollbars({ children, ...elementProps }) {
  return (
    <ReactScrollbars props={elementProps} universal>
      {children}
    </ReactScrollbars>
  );
}

Scrollbars.propTypes = propTypes;

export default Scrollbars;
