import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';
import { formatChildren } from '../../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  raw: PropTypes.bool,
};

const defaultProps = {
  raw: false,
};

function TableData({ children, raw, ...elementProps }) {
  // TODO: Remove pseudo view and add react-native compatible component
  return (
    <BaseView pseudo tag="td" props={elementProps} className="">
      {formatChildren(children, raw)}
    </BaseView>
  );
}

TableData.propTypes = propTypes;
TableData.defaultProps = defaultProps;

export default TableData;
