import React from 'react';
import PropTypes from 'prop-types';
import { BaseText } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function Cite({ children, ...elementProps }) {
  return (
    <BaseText props={elementProps} tag="cite" className="" inlineOnly>
      {children}
    </BaseText>
  );
}

Cite.propTypes = propTypes;

export default Cite;
