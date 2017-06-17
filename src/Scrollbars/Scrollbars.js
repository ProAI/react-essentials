import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars as ReactCustomScrollbars } from 'react-custom-scrollbars';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function Scrollbars({ children, ...attributes }) {
  return (
    <ReactCustomScrollbars {...attributes}>
      {children}
    </ReactCustomScrollbars>
  );
}

Scrollbars.propTypes = propTypes;

export default Scrollbars;
