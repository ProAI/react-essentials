/**
 * Forked from: https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/exports/View/index.js
 *
 * We had to fork this file from react-native-web because of the following reasons:
 * - Usage of custom tags
 * - Internally usage of deprecated className prop for bootstrap styles
 * - Usage of styleName shorthand styles
 *
 * This file can be removed once all bootstrap styles are converted to css-in-js.
 */

import applyLayout from 'react-native-web/dist/cjs/modules/applyLayout';
import applyNativeMethods from 'react-native-web/dist/cjs/modules/applyNativeMethods';
import { bool, string, shape } from 'prop-types';
// eslint-disable-next-line import/order
import createElement from './createElement';
import filterSupportedProps from 'react-native-web/dist/cjs/exports/View/filterSupportedProps';
import invariant from 'fbjs/lib/invariant';
import warning from 'fbjs/lib/warning';
import StyleSheet from 'react-native-web/dist/cjs/exports/StyleSheet';
import ViewPropTypes from 'react-native-web/dist/cjs/exports/View/ViewPropTypes';
import React, { Component } from 'react';

import cx from 'classnames';
import checkUtilityClasses from '../checkUtilityClasses';
import createUtilityClasses from '../createUtilityClasses';

const styles = StyleSheet.create({
  inline: {
    display: 'inline-flex',
  },
});

const calculateHitSlopStyle = hitSlop => {
  const hitStyle = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const prop in hitSlop) {
    // eslint-disable-next-line no-prototype-builtins
    if (hitSlop.hasOwnProperty(prop)) {
      const value = hitSlop[prop];
      hitStyle[prop] = value > 0 ? -1 * value : 0;
    }
  }

  return hitStyle;
};

// eslint-disable-next-line react/prefer-stateless-function
class BaseView extends Component {
  static displayName = 'View';

  static contextTypes = {
    isInAParentText: bool,
  };

  static propTypes = {
    ...ViewPropTypes,
    styleName: string,
    essentials: shape({
      tag: string,
      className: string,
      pseudo: bool,
    }).isRequired,
  };

  static defaultProps = {
    styleName: null,
  };

  render() {
    const {
      hitSlop,
      children,
      className: customClassName,
      style,
      styleName,
      essentials: { tag, className, pseudo },
    } = this.props;
    const supportedProps = filterSupportedProps(this.props);

    if (process.env.NODE_ENV !== 'production') {
      if (styleName) {
        checkUtilityClasses(styleName);
      }

      warning(
        customClassName == null,
        'Using the "className" prop on <View> is deprecated.',
      );

      React.Children.toArray(children).forEach(item => {
        invariant(
          typeof item !== 'string',
          `Unexpected text node: ${item}. A text node cannot be a child of a <View>.`,
        );
      });
    }

    const { isInAParentText } = this.context;

    supportedProps.className = cx(
      // add yoga layout styles
      !pseudo && 'yv',
      // add (mostly) bootstrap styles
      className,
      // add custom styles
      customClassName,
      // add utils styles
      createUtilityClasses(styleName),
    );
    supportedProps.style = StyleSheet.compose(
      isInAParentText && styles.inline,
      style,
    );

    if (hitSlop) {
      const hitSlopStyle = calculateHitSlopStyle(hitSlop);
      const hitSlopChild = createElement('span', {
        className: 'yv-hit-slop',
        style: hitSlopStyle,
      });
      supportedProps.children = React.Children.toArray([
        hitSlopChild,
        supportedProps.children,
      ]);
    }

    return createElement(tag || 'div', supportedProps);
  }
}

export default applyLayout(applyNativeMethods(BaseView));
