import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseText } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
  lead: PropTypes.bool,
  last: PropTypes.bool,
};

const defaultProps = {
  lead: false,
  last: false,
};

function Paragraph({ children, lead, last, ...elementProps }) {
  const classes = cx(
    // variable classes
    lead && 'lead',
    last && 'mb-0',
  );

  return (
    <BaseText props={elementProps} tag="p" className={classes} blockOnly>
      {children}
    </BaseText>
  );
}

Paragraph.propTypes = propTypes;
Paragraph.defaultProps = defaultProps;

export default Paragraph;
