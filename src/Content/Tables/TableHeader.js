import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function TableHeader({ children, ...elementProps }) {
  // TODO: Remove pseudo view and add react-native compatible component
  return (
    <BaseView pseudo tag="thead" props={elementProps} className="">
      {children}
    </BaseView>
  );
}

TableHeader.propTypes = propTypes;

export default TableHeader;
