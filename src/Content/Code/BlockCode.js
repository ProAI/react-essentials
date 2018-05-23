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

function BlockCode({ children, raw, ...elementProps }) {
  return (
    <BaseView props={elementProps} tag="pre" className="">
      <BaseView props={elementProps} tag="code" className="">
        {formatChildren(children, raw)}
      </BaseView>
    </BaseView>
  );
}

BlockCode.propTypes = propTypes;
BlockCode.defaultProps = defaultProps;

export default BlockCode;
