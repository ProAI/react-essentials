import React from 'react';
import { Scrollbars as ReactScrollbars } from 'react-custom-scrollbars';

function Scrollbars({ ...elementProps }) {
  return <ReactScrollbars {...elementProps} universal />;
}

export default Scrollbars;
