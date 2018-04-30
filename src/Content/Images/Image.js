import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { UTILS } from '../utils/propTypes';

const propTypes = {
  source: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  fluid: PropTypes.bool,
  thumbnail: PropTypes.bool,
  class: PropTypes.arrayOf(UTILS),
  style: PropTypes.object,
};

const defaultProps = {
  fluid: false,
  thumbnail: false,
  class: null,
  style: null,
};

function Image({
  source, alt, fluid, thumbnail, class: utils, style,
}) {
  const classes = cx(
    // variable classes
    fluid ? 'img-fluid' : null,
    thumbnail ? 'img-thumbnail' : null,
    // util classes
    utils.join(' '),
  );

  return <img src={source} alt={alt} className={classes} style={style} />;
}

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
