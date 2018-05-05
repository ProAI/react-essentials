import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
  source: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  fluid: PropTypes.bool,
  thumbnail: PropTypes.bool,
};

const defaultProps = {
  fluid: false,
  thumbnail: false,
};

function Image({
  source, alt, fluid, thumbnail,
}) {
  const classes = cx(
    // variable classes
    fluid && 'img-fluid',
    thumbnail && 'img-thumbnail',
  );

  return <img src={source} alt={alt} className={classes} />;
}

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
