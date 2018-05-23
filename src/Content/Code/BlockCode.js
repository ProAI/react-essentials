import React from 'react';
import PropTypes from 'prop-types';
import { BaseView, BaseText } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function BlockCode({ children, ...elementProps }) {
  return (
    <BaseView props={elementProps} tag="pre" className="">
      <BaseView props={elementProps} tag="code" className="">
        <BaseText className="" blockOnly>
          {children}
        </BaseText>
      </BaseView>
    </BaseView>
  );
}

BlockCode.propTypes = propTypes;

export default BlockCode;
