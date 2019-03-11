import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import getUnicodeChars from './getUnicodeChars';
import emojioneList from './emojioneList';

const propTypes = {
  name: PropTypes.string.isRequired,
  textSize: PropTypes.oneOf(['sm', 'lg']),
  sprites: PropTypes.bool,
  imagePath: PropTypes.string,
  cacheBustParam: PropTypes.string,
};

const defaultProps = {
  textSize: null,
  sprites: false,
  imagePath: '/emojis',
  cacheBustParam: '?v=2.2.6',
};

function Emoji({ name, sprites, textSize, imagePath, cacheBustParam }) {
  const emoji = emojioneList[`:${name}:`];

  const unicode = emoji[emoji.length - 1];
  const backgroundImage = sprites
    ? `${imagePath}/emojione.sprites.svg${cacheBustParam}#emoji-${unicode}`
    : `${imagePath}/${unicode}.svg${cacheBustParam}`;

  const classes = cx(
    // constant classes
    'emoji',
    // variable classes
    textSize === 'sm' && 'emoji-sm',
    textSize === 'lg' && 'emoji-lg',
  );

  const unicodeChars = getUnicodeChars(emoji[0]);

  if (sprites) {
    const useTag = `<use xlink:href="${backgroundImage}" />`;

    return (
      <svg
        className={classes}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: useTag }}
      />
    );
  }

  return <img src={backgroundImage} alt={unicodeChars} className={classes} />;
}

Emoji.propTypes = propTypes;
Emoji.defaultProps = defaultProps;

export default Emoji;
