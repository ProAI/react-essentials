/**
 * Forked from: https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/exports/Text/index.js
 *
 * We had to fork this file from react-native-web because of the following reasons:
 * - Check for blockOnly and inlineOnly
 * - Usage of custom tags
 * - Internally usage of deprecated className prop for bootstrap styles
 * - Usage of styleName shorthand styles
 *
 * This file can be removed once all bootstrap styles are converted to css-in-js.
 */

import applyLayout from 'react-native-web/dist/cjs/modules/applyLayout';
import applyNativeMethods from 'react-native-web/dist/cjs/modules/applyNativeMethods';
import PropTypes from 'prop-types';
import { Component } from 'react';
// eslint-disable-next-line import/order
import createElement from './createElement';
import warning from 'fbjs/lib/warning';
import StyleSheet from 'react-native-web/dist/cjs/exports/StyleSheet';
import TextPropTypes from 'react-native-web/dist/cjs/exports/Text/TextPropTypes';

import invariant from 'fbjs/lib/invariant';
import cx from 'classnames';
import checkUtilityClasses from '../checkUtilityClasses';
import createUtilityClasses from '../createUtilityClasses';

const propTypes = {
  ...TextPropTypes,
  styleName: PropTypes.string,
  essentials: PropTypes.shape({
    tag: PropTypes.string,
    className: PropTypes.string,
    blockOnly: PropTypes.bool,
    inlineOnly: PropTypes.bool,
  }).isRequired,
};

const defaultProps = {
  styleName: null,
};

const styles = StyleSheet.create({
  notSelectable: {
    userSelect: 'none',
  },
  pressable: {
    cursor: 'pointer',
  },
});

const createEnterHandler = fn => {
  return e => {
    if (e.keyCode === 13 && fn) {
      fn(e);
    }
  };
};

const createPressHandler = fn => {
  return e => {
    e.stopPropagation();
    if (fn) fn(e);
  };
};

class BaseText extends Component {
  constructor(props, context) {
    super(props, context);

    // check if a block only component is used inside of a text component
    if (process.env.NODE_ENV !== 'production') {
      if (props.essentials.blockOnly) {
        invariant(
          !context.isInAParentText,
          "Unexpected use of text block component: This component can't be used inside of a text component.",
        );
      }
      if (props.essentials.inlineOnly) {
        invariant(
          context.isInAParentText,
          'Unexpected use of text inline component: This component can only be used inside of a text component.',
        );
      }
    }
  }

  getChildContext() {
    return { isInAParentText: true };
  }

  render() {
    const {
      className: customClassName,
      styleName,
      dir,
      numberOfLines,
      onPress,
      selectable,
      style,
      essentials: { tag, className },
      /* react-native-web props - begin */
      adjustsFontSizeToFit,
      allowFontScaling,
      ellipsizeMode,
      lineBreakMode,
      minimumFontScale,
      onLayout,
      onLongPress,
      pressRetentionOffset,
      selectionColor,
      suppressHighlighting,
      textBreakStrategy,
      tvParallaxProperties,
      /* react-native-web props - end */
      ...otherProps
    } = this.props;

    const { isInAParentText } = this.context;

    if (process.env.NODE_ENV !== 'production') {
      warning(
        customClassName == null,
        'Using the "className" prop on <Text> is deprecated.',
      );

      if (styleName) {
        checkUtilityClasses(styleName);
      }
    }

    if (onPress) {
      otherProps.accessible = true;
      otherProps.onClick = createPressHandler(onPress);
      otherProps.onKeyDown = createEnterHandler(onPress);
    }

    otherProps.className = cx(
      // add yoga layout styles
      'yt',
      isInAParentText && 'yt-has-ancestor',
      numberOfLines === 1 && 'yt-one-line',
      numberOfLines > 1 && 'yt-multi-line',
      // add (mostly) bootstrap styles
      className,
      // add custom styles
      customClassName,
      // add utils styles
      createUtilityClasses(styleName),
    );
    // allow browsers to automatically infer the language writing direction
    otherProps.dir = dir !== undefined ? dir : 'auto';
    otherProps.style = [
      style,
      numberOfLines > 1 && { WebkitLineClamp: numberOfLines },
      selectable === false && styles.notSelectable,
      onPress && styles.pressable,
    ];

    const component = tag || (isInAParentText ? 'span' : 'div');

    return createElement(component, otherProps);
  }
}

BaseText.displayName = 'Text';
BaseText.propTypes = propTypes;
BaseText.defaultProps = defaultProps;
BaseText.childContextTypes = {
  isInAParentText: PropTypes.bool,
};
BaseText.contextTypes = {
  isInAParentText: PropTypes.bool,
};

export default applyLayout(applyNativeMethods(BaseText));
