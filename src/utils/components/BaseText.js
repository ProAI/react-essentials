import React from 'react';
import PropTypes from 'prop-types';
import StyleSheetPropType from 'react-native-web/dist/cjs/modules/StyleSheetPropType';
import TextStylePropTypes from 'react-native-web/dist/cjs/exports/Text/TextStylePropTypes';
import invariant from 'fbjs/lib/invariant';
import cx from 'classnames';
import createDOMProps from '../createDOMProps';
import checkUtilityClasses from '../checkUtilityClasses';
import createUtilityClasses from '../createUtilityClasses';
import { TEXT_COLORS } from '../constants';

const stylePropType = StyleSheetPropType(TextStylePropTypes);

const propTypes = {
  children: PropTypes.node.isRequired,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  props: PropTypes.shape({
    class: PropTypes.string,
    className: PropTypes.string,
    color: PropTypes.oneOf(TEXT_COLORS),
    align: PropTypes.oneOf(['justify', 'left', 'center', 'right']),
    mark: PropTypes.bool,
    small: PropTypes.bool,
    underline: PropTypes.bool,
    bold: PropTypes.bool,
    italic: PropTypes.bool,
    style: stylePropType,
  }),
  className: PropTypes.string.isRequired,
  blockOnly: PropTypes.bool,
  inlineOnly: PropTypes.bool,
};

const contextTypes = {
  isInAParentText: PropTypes.bool,
};

const childContextTypes = {
  isInAParentText: PropTypes.bool,
};

const defaultProps = {
  props: {
    class: null,
    align: null,
    color: null,
    mark: false,
    small: false,
    underline: false,
    bold: false,
    italic: false,
  },
  tag: null,
  blockOnly: false,
  inlineOnly: false,
};

class BaseText extends React.Component {
  constructor(props, context) {
    super(props, context);

    // check if a block only component is used inside of a text component
    if (process.env.NODE_ENV !== 'production') {
      if (props.blockOnly) {
        invariant(
          !context.isInAParentText,
          "Unexpected use of text block component: This component can't be used inside of a text component.",
        );
      }
      if (props.inlineOnly) {
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

  getTag(tag) {
    if (tag) return tag;

    const { isInAParentText } = this.context;
    if (!isInAParentText) return 'div';

    return 'span';
  }

  render() {
    const {
      children,
      props: {
        class: utils,
        className: customClassName,
        align,
        color,
        mark,
        small,
        underline,
        bold,
        italic,
        ...otherProps
      },
      tag,
      className,
    } = this.props;

    if (process.env.NODE_ENV !== 'production') {
      if (utils) {
        checkUtilityClasses(utils);
      }
    }

    const Tag = this.getTag(tag);

    const { isInAParentText } = this.context;
    const classes = cx(
      // add yoga styles
      isInAParentText ? 'yti' : 'ytb',
      // variable classes
      color && `text-${color}`,
      align && `text-${align}`,
      mark && 'mark',
      small && 'small',
      // add (mostly) bootstrap styles
      className,
      // add custom styles
      customClassName,
      // add utils styles
      createUtilityClasses(utils),
    );

    // wrap children with underline, bold and italic tags
    const childrenWithU = underline ? <u>{children}</u> : children;
    const childrenWithUB = bold ? (
      <strong>{childrenWithU}</strong>
    ) : (
      childrenWithU
    );
    const childrenWithUBI = italic ? <em>{childrenWithUB}</em> : childrenWithUB;

    return (
      <Tag {...createDOMProps({ ...otherProps, className: classes })}>
        {childrenWithUBI}
      </Tag>
    );
  }
}

BaseText.propTypes = propTypes;
BaseText.contextTypes = contextTypes;
BaseText.childContextTypes = childContextTypes;
BaseText.defaultProps = defaultProps;

export default BaseText;
