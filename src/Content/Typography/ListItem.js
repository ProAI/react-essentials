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

function List({ children, raw, ...elementProps }) {
  // TODO: Remove pseudo view and add react-native compatible component
  return (
    <BaseView pseudo tag="li" className="" props={elementProps}>
      {formatChildren(children, raw)}
    </BaseView>
  );
}

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;
