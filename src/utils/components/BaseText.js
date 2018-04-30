import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { UTILS } from '../../utils/propTypes';

const propTypes = {
  class: PropTypes.arrayOf(UTILS),
  tag: PropTypes.string.isRequired,
};

const defaultProps = {
  class: null,
};

function BaseText({ class: utils, tag: Tag, ...props }) {
  const classes = cx(utils.join(' '));

  return (
    <Tag className={classes} {...props} />
  );
}

BaseText.propTypes = propTypes;
BaseText.defaultProps = defaultProps;

export default BaseText;
