import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseImage } from '../../utils/components';

const propTypes = {
  source: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  fluid: PropTypes.bool,
  thumbnail: PropTypes.bool,
};

const defaultProps = {
  fluid: false,
  thumbnail: false,
};

function Image({
  source, label, fluid, thumbnail, ...elementProps
}) {
  const classes = cx(
    // variable classes
    fluid && 'img-fluid',
    thumbnail && 'img-thumbnail',
  );

  return <BaseImage source={source} label={label} props={elementProps} className={classes} />;
}

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
