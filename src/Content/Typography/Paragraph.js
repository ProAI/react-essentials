import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseText from '../../utils/rnw-compat/BaseText';

const propTypes = {
  children: PropTypes.node.isRequired,
  lead: PropTypes.bool,
  last: PropTypes.bool,
};

const defaultProps = {
  lead: false,
  last: false,
};

const Paragraph = React.forwardRef(function Paragraph(props, ref) {
  const { lead, last, ...elementProps } = props;

  const classes = cx(
    // variable classes
    lead && 'lead',
    last && 'mb-0',
  );

  return (
    <BaseText
      {...elementProps}
      ref={ref}
      essentials={{ tag: 'p', className: classes, blockOnly: true }}
    />
  );
});

Paragraph.propTypes = propTypes;
Paragraph.defaultProps = defaultProps;

export default Paragraph;
