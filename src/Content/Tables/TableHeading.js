import React from 'react';
import PropTypes from 'prop-types';
import { BaseView, BaseText } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function TableHeading({ children, ...elementProps }) {
  // TODO: Remove pseudo view and add react-native compatible component
  return (
    <BaseView pseudo tag="th" props={elementProps} className="">
      <BaseText className="" blockOnly>
        {children}
      </BaseText>
    </BaseView>
  );
}

TableHeading.propTypes = propTypes;

export default TableHeading;
