/**
 * Forked from: https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/exports/TouchableOpacity/index.js
 *
 * We had to fork this file from react-native-web because of the following reasons:
 * - Internally usage of deprecated className prop for bootstrap styles
 * - Usage of styleName shorthand styles
 *
 * This file can be removed once all bootstrap styles are converted to css-in-js.
 */

import applyNativeMethods from 'react-native-web/dist/cjs/modules/applyNativeMethods';
import createReactClass from 'create-react-class';
import ensurePositiveDelayProps from 'react-native-web/dist/cjs/exports/Touchable/ensurePositiveDelayProps';
import PropTypes from 'prop-types';
import React from 'react';
import StyleSheet from 'react-native-web/dist/cjs/exports/StyleSheet';
import Touchable from 'react-native-web/dist/cjs/exports/Touchable';
import TouchableWithoutFeedback from 'react-native-web/dist/cjs/exports/TouchableWithoutFeedback';
import View from './BaseView';

const flattenStyle = StyleSheet.flatten;

const PRESS_RETENTION_OFFSET = { top: 20, left: 20, right: 20, bottom: 30 };

/**
 * A wrapper for making views respond properly to touches.
 * On press down, the opacity of the wrapped view is decreased, dimming it.
 *
 * Opacity is controlled by wrapping the children in a View, which is
 * added to the view hiearchy. Be aware that this can affect layout.
 *
 * Example:
 *
 * ```
 * renderButton: function() {
 *   return (
 *     <TouchableOpacity onPress={this._onPressButton}>
 *       <Image
 *         style={styles.button}
 *         source={require('./myButton.png')}
 *       />
 *     </TouchableOpacity>
 *   );
 * },
 * ```
 */

/* eslint-disable */
const BaseTouchable = createReactClass({
  displayName: 'TouchableOpacity',
  mixins: [Touchable.Mixin],

  propTypes: {
    ...TouchableWithoutFeedback.propTypes,
    /**
     * Determines what the opacity of the wrapped view should be when touch is
     * active.
     */
    activeOpacity: PropTypes.number,
    focusedOpacity: PropTypes.number,
  },

  getDefaultProps: function () {
    return {
      activeOpacity: 1,
      focusedOpacity: 1,
    };
  },

  getInitialState: function () {
    return this.touchableGetInitialState();
  },

  componentDidMount: function () {
    ensurePositiveDelayProps(this.props);
  },

  componentWillReceiveProps: function (nextProps) {
    ensurePositiveDelayProps(nextProps);
  },

  /**
   * Animate the touchable to a new opacity.
   */
  setOpacityTo: function (value, duration) {
    this.setNativeProps({
      style: {
        opacity: value,
        transitionDuration: duration ? `${duration / 1000}s` : '0s',
      },
    });
  },

  /**
   * `Touchable.Mixin` self callbacks. The mixin will invoke these if they are
   * defined on your component.
   */
  touchableHandleActivePressIn: function (e) {
    if (e.dispatchConfig.registrationName === 'onResponderGrant') {
      this._opacityActive(0);
    } else {
      this._opacityActive(150);
    }
    this.props.onPressIn && this.props.onPressIn(e);
  },

  touchableHandleActivePressOut: function (e) {
    this._opacityInactive(250);
    this.props.onPressOut && this.props.onPressOut(e);
  },

  touchableHandlePress: function (e) {
    this.props.onPress && this.props.onPress(e);
  },

  touchableHandleLongPress: function (e) {
    this.props.onLongPress && this.props.onLongPress(e);
  },

  touchableGetPressRectOffset: function () {
    return this.props.pressRetentionOffset || PRESS_RETENTION_OFFSET;
  },

  touchableGetHitSlop: function () {
    return this.props.hitSlop;
  },

  touchableGetHighlightDelayMS: function () {
    return this.props.delayPressIn || 0;
  },

  touchableGetLongPressDelayMS: function () {
    return this.props.delayLongPress === 0
      ? 0
      : this.props.delayLongPress || 500;
  },

  touchableGetPressOutDelayMS: function () {
    return this.props.delayPressOut;
  },

  _opacityActive: function (duration) {
    this.setOpacityTo(this.props.activeOpacity, duration);
  },

  _opacityInactive: function (duration) {
    this.setOpacityTo(this._getChildStyleOpacityWithDefault(), duration);
  },

  _opacityFocused: function () {
    this.setOpacityTo(this.props.focusedOpacity);
  },

  _getChildStyleOpacityWithDefault: function () {
    const childStyle = flattenStyle(this.props.style) || {};
    return childStyle.opacity === undefined ? 1 : childStyle.opacity;
  },

  render: function () {
    const {
      activeOpacity,
      focusedOpacity,
      delayLongPress,
      delayPressIn,
      delayPressOut,
      onLongPress,
      onPress,
      onPressIn,
      onPressOut,
      pressRetentionOffset,
      ...other
    } = this.props;

    return (
      <View
        {...other}
        accessible={this.props.accessible !== false}
        onKeyDown={this.touchableHandleKeyEvent}
        onKeyUp={this.touchableHandleKeyEvent}
        onResponderGrant={this.touchableHandleResponderGrant}
        onResponderMove={this.touchableHandleResponderMove}
        onResponderRelease={this.touchableHandleResponderRelease}
        onResponderTerminate={this.touchableHandleResponderTerminate}
        onResponderTerminationRequest={
          this.touchableHandleResponderTerminationRequest
        }
        onStartShouldSetResponder={this.touchableHandleStartShouldSetResponder}
        style={[
          styles.root,
          !this.props.disabled && styles.actionable,
          this.props.style,
        ]}
      >
        {this.props.children}
        {Touchable.renderDebugView({
          color: 'blue',
          hitSlop: this.props.hitSlop,
        })}
      </View>
    );
  },
});

const styles = StyleSheet.create({
  root: {
    transitionProperty: 'opacity',
    transitionDuration: '0.15s',
    userSelect: 'none',
  },
  actionable: {
    cursor: 'pointer',
    touchAction: 'manipulation',
  },
});
/* eslint-enable */

export default applyNativeMethods(BaseTouchable);
