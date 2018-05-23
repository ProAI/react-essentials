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

function DropdownHeader({ children, raw, ...elementProps }) {
  return (
    <BaseView tag="h6" props={elementProps} className="dropdown-header" blockOnly>
      {formatChildren(children, raw)}
    </BaseView>
  );
}

DropdownHeader.propTypes = propTypes;
DropdownHeader.defaultProps = defaultProps;

export default DropdownHeader;
