import React, { PropTypes } from 'react';
import cx from 'classnames';
import getUnicodeChars from './getUnicodeChars';
import emojioneList from './emojioneList';

const propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  textSize: PropTypes.oneOf([
    'sm',
    'lg',
  ]),
  sprites: PropTypes.bool,
  imagePath: PropTypes.string,
  cacheBustParam: PropTypes.string,
};

const defaultProps = {
  sprites: false,
  imagePath: '/emojis',
  cacheBustParam: '?v=2.2.6',
};

function Emoji({ className, name, sprites, textSize, imagePath, cacheBustParam }) {
  const emoji = emojioneList[`:${name}:`];

  const unicode = emoji[emoji.length - 1];
  const backgroundImage = (sprites)
    ? `${imagePath}/emojione.sprites.svg${cacheBustParam}#emoji-${unicode}`
    : `${imagePath}/${unicode}.svg${cacheBustParam}`;

  const classes = cx(
    'emoji',
    { 'emoji-sm': (textSize === 'sm') },
    { 'emoji-lg': (textSize === 'lg') },
    className,
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

  return (
    <img
      src={backgroundImage}
      alt={unicodeChars}
      className={classes}
    />
  );
}

Emoji.propTypes = propTypes;
Emoji.defaultProps = defaultProps;

export default Emoji;
