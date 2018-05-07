import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseImage } from '../../utils/components';

const propTypes = {
  fluid: PropTypes.bool,
  thumbnail: PropTypes.bool,
};

const defaultProps = {
  fluid: false,
  thumbnail: false,
};

function Image({ fluid, thumbnail, ...elementProps }) {
  const classes = cx(
    // variable classes
    fluid && 'img-fluid',
    thumbnail && 'img-thumbnail',
  );

  return <BaseImage props={elementProps} className={classes} />;
}

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
