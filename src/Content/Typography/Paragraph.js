import React from 'react';
import PropTypes from 'prop-types';
import { BaseText } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
  lead: PropTypes.bool,
};

const defaultProps = {
  lead: false,
};

function Paragraph({ children, ...elementProps }) {
  return (
    <BaseText props={elementProps} tag="p" className="" blockOnly>
      {children}
    </BaseText>
  );
}

Paragraph.propTypes = propTypes;
Paragraph.defaultProps = defaultProps;

export default Paragraph;
