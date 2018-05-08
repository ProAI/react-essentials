import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function TableBody({ children, ...elementProps }) {
  // TODO: Remove pseudo view and add react-native compatible component
  return (
    <BaseView pseudo tag="tbody" props={elementProps} className="">
      {children}
    </BaseView>
  );
}

TableBody.propTypes = propTypes;

export default TableBody;
