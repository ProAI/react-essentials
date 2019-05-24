import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseText from '../../utils/rnw-compat/BaseText';
import { TEXT_COLORS } from '../../utils/constants';

const propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(TEXT_COLORS),
  align: PropTypes.oneOf(['justify', 'left', 'center', 'right']),
  mark: PropTypes.bool,
  small: PropTypes.bool,
  bold: PropTypes.bool,
  italic: PropTypes.bool,
};

const defaultProps = {
  align: null,
  color: null,
  mark: false,
  small: false,
  bold: false,
  italic: false,
};

const Text = React.forwardRef(function Text(props, ref) {
  const { align, color, mark, small, bold, italic, ...elementProps } = props;

  const classes = cx(
    // variable classes
    color && `text-${color}`,
    align && `text-${align}`,
    mark && 'mark',
    small && 'small',
    bold && 'font-weight-bold',
    italic && 'font-italic',
  );

  return (
    <BaseText {...elementProps} ref={ref} essentials={{ className: classes }} />
  );
});

Text.displayName = 'Text';
Text.propTypes = propTypes;
Text.defaultProps = defaultProps;

export default Text;
