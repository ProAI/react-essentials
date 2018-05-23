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

function DropdownTextItem({ children, raw, ...elementProps }) {
  return (
    <BaseView tag="span" props={elementProps} className="dropdown-item-text" blockOnly>
      {formatChildren(children, raw)}
    </BaseView>
  );
}

DropdownTextItem.propTypes = propTypes;
DropdownTextItem.defaultProps = defaultProps;

export default DropdownTextItem;
