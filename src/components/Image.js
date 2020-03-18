import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseImage from '../utils/rnw-compat/BaseImage';

const propTypes = {
  fluid: PropTypes.bool,
  thumbnail: PropTypes.bool,
};

const Image = React.forwardRef(function Image(props, ref) {
  const { fluid = false, thumbnail = false, ...elementProps } = props;

  const classes = cx(
    // variable classes
    fluid && 'img-fluid',
    thumbnail && 'img-thumbnail',
  );

  return (
    <BaseImage
      {...elementProps}
      ref={ref}
      essentials={{ className: classes }}
    />
  );
});

Image.displayName = 'Image';
Image.propTypes = propTypes;

export default Image;
