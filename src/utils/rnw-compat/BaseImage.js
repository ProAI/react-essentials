import PropTypes from 'prop-types';
import cx from 'classnames';
import applyNativeMethods from 'react-native-web/dist/cjs/modules/applyNativeMethods';
import StyleSheetPropType from 'react-native-web/dist/cjs/modules/StyleSheetPropType';
import createElement from 'react-native-web/dist/cjs/exports/createElement';
import ViewPropTypes from 'react-native-web/dist/cjs/exports/View/ViewPropTypes';
import ImageResizeMode from 'react-native-web/dist/cjs/exports/Image/ImageResizeMode';
import ImageSourcePropType from 'react-native-web/dist/cjs/exports/Image/ImageSourcePropType';
import ImageStylePropTypes from 'react-native-web/dist/cjs/exports/Image/ImageStylePropTypes';
import invariant from 'fbjs/lib/invariant';
import checkUtilityClasses from '../checkUtilityClasses';
import createUtilityClasses from '../createUtilityClasses';

const propTypes = {
  source: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  props: PropTypes.shape({
    /* copied from react-native-web - begin */
    ...ViewPropTypes,
    blurRadius: PropTypes.number,
    defaultSource: ImageSourcePropType,
    draggable: PropTypes.bool,
    onError: PropTypes.func,
    onLoad: PropTypes.func,
    onLoadEnd: PropTypes.func,
    onLoadStart: PropTypes.func,
    resizeMode: PropTypes.oneOf(Object.keys(ImageResizeMode)),
    source: ImageSourcePropType,
    style: StyleSheetPropType(ImageStylePropTypes),
    // compatibility with React Native
    /* eslint-disable react/sort-prop-types */
    capInsets: PropTypes.shape({
      top: PropTypes.number,
      left: PropTypes.number,
      bottom: PropTypes.number,
      right: PropTypes.number,
    }),
    resizeMethod: PropTypes.oneOf(['auto', 'resize', 'scale']),
    /* eslint-enable react/sort-prop-types */
    /* copied from react-native-web - end */
    styleName: PropTypes.string,
    className: PropTypes.string,
  }),
  className: PropTypes.string.isRequired,
};

const contextTypes = {
  isInAParentText: PropTypes.bool,
};

const defaultProps = {
  props: {
    styleName: null,
  },
};

function BaseImage(props, context) {
  const {
    source,
    label,
    props: { styleName: utils, className: customClassName, ...otherProps },
    className,
  } = props;

  if (process.env.NODE_ENV !== 'production') {
    if (utils) {
      checkUtilityClasses(utils);
    }

    invariant(
      !context.isInAParentText,
      'An image cannot be used inside of a text component',
    );
  }

  const classes = cx(
    // add (mostly) bootstrap styles
    className,
    // add custom styles
    customClassName,
    // add utils styles
    createUtilityClasses(utils),
  );

  return createElement(
    'img',
    {
      ...otherProps,
      src: source,
      alt: label,
      className: classes,
    },
    null,
  );
}

BaseImage.propTypes = propTypes;
BaseImage.defaultProps = defaultProps;
BaseImage.contextTypes = contextTypes;

export default applyNativeMethods(BaseImage);
