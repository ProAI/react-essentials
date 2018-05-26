import React from 'react';
import PropTypes from 'prop-types';
import StyleSheetPropType from 'react-native-web/dist/cjs/modules/StyleSheetPropType';
import ViewStylePropTypes from 'react-native-web/dist/cjs/exports/Text/TextStylePropTypes';
import invariant from 'fbjs/lib/invariant';
import cx from 'classnames';
import createDOMProps from '../createDOMProps';
import checkUtilityClasses from '../checkUtilityClasses';

const stylePropType = StyleSheetPropType(ViewStylePropTypes);

const propTypes = {
  children: PropTypes.node,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  props: PropTypes.shape({
    class: PropTypes.string,
    className: PropTypes.string,
    style: stylePropType,
  }),
  className: PropTypes.string.isRequired,
  pseudo: PropTypes.bool,
};

const contextTypes = {
  isInAParentText: PropTypes.bool,
};

const defaultProps = {
  children: null,
  props: {
    class: null,
  },
  tag: 'div',
  pseudo: false,
};

function BaseView(props, context) {
  const {
    children,
    props: { class: utils, className: customClassName, ...otherProps },
    tag: Tag,
    className,
    pseudo,
  } = props;

  // checks
  if (process.env.NODE_ENV !== 'production') {
    if (utils) {
      checkUtilityClasses(utils);
    }

    invariant(!context.isInAParentText, 'A view cannot be used inside of a text component');

    React.Children.toArray(children).forEach((item) => {
      invariant(
        typeof item !== 'string',
        `Unexpected text node: ${item}. A text node cannot be a child of a <View>.`,
      );
    });
  }

  const classes = cx(
    // add yoga layout styles
    !pseudo && 'yv',
    // add (mostly) bootstrap styles
    className,
    // add custom styles
    customClassName,
    // add utils styles
    utils,
  );

  return <Tag {...createDOMProps({ ...otherProps, className: classes })}>{children}</Tag>;
}

BaseView.propTypes = propTypes;
BaseView.contextTypes = contextTypes;
BaseView.defaultProps = defaultProps;

export default BaseView;
