import React from 'react';
import PropTypes from 'prop-types';
import { BaseText } from '../../utils/components';

const propTypes = {
  lead: PropTypes.bool,
};

const defaultProps = {
  lead: false,
};

function Paragraph({ ...otherProps }) {
  return <BaseText {...otherProps} tag="p" className="" blockOnly />;
}

Paragraph.propTypes = propTypes;
Paragraph.defaultProps = defaultProps;

export default Paragraph;
