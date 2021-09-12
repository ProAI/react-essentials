/**
 * Forked from: https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/exports/View/index.js
 *
 * We had to fork this file from react-native-web because of the following reasons:
 * - Usage of custom tags
 * - Internally usage of deprecated className prop for bootstrap styles
 * - Usage of styleName shorthand styles
 * - Warn about View inside of a text component
 *
 * This file can be removed once all bootstrap styles are converted to css-in-js.
 */

import applyLayout from 'react-native-web/dist/cjs/modules/applyLayout';
import applyNativeMethods from 'react-native-web/dist/cjs/modules/applyNativeMethods';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/order
import createElement from './createElement';
import filterSupportedProps from 'react-native-web/dist/cjs/exports/View/filterSupportedProps';
import invariant from 'fbjs/lib/invariant';
import warning from 'fbjs/lib/warning';
import StyleSheet from 'react-native-web/dist/cjs/exports/StyleSheet';
import ViewPropTypes from 'react-native-web/dist/cjs/exports/View/ViewPropTypes';
import React, { Component } from 'react';

import cx from 'classnames';
import checkUtilityClasses from './checkUtilityClasses';
import createUtilityClasses from './createUtilityClasses';

const propTypes = {
  ...ViewPropTypes,
  styleName: PropTypes.string,
  essentials: PropTypes.shape({
    tag: PropTypes.string,
    className: PropTypes.string,
    pseudo: PropTypes.bool,
  }).isRequired,
};

const defaultProps = {
  styleName: null,
};

const calculateHitSlopStyle = (hitSlop) => {
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

    const { isInAParentText } = this.context;

    if (process.env.NODE_ENV !== 'production') {
      if (styleName) {
        checkUtilityClasses(styleName);
      }

      warning(
        customClassName == null,
        'Using the "className" prop on <View> is deprecated.',
      );

      React.Children.toArray(children).forEach((item) => {
        invariant(
          typeof item !== 'string',
          `Unexpected text node: ${item}. A text node cannot be a child of a <View>.`,
        );
      });
    }

    supportedProps.className = cx(
      // add yoga layout styles
      !pseudo && 'yv',
      // add flex-inline if inside text
      isInAParentText && 'yv-inline',
      // add (mostly) bootstrap styles
      className,
      // add custom styles
      customClassName,
      // add utils styles
      createUtilityClasses(styleName),
    );
    supportedProps.style = StyleSheet.compose(style);

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

BaseView.displayName = 'View';
BaseView.propTypes = propTypes;
BaseView.defaultProps = defaultProps;
BaseView.contextTypes = {
  isInAParentText: PropTypes.bool,
};

export default applyLayout(applyNativeMethods(BaseView));
