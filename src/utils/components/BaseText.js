import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'fbjs/lib/invariant';
import cx from 'classnames';
import { UTILS, TEXT_COLORS } from '../constants';

const propTypes = {
  children: PropTypes.node.isRequired,
  elementProps: PropTypes.shape({
    class: PropTypes.arrayOf(UTILS),
    color: PropTypes.oneOf(TEXT_COLORS),
    align: PropTypes.oneOf(['justify', 'left', 'center', 'right']),
    mark: PropTypes.bool,
    small: PropTypes.bool,
    underline: PropTypes.bool,
    bold: PropTypes.bool,
    italic: PropTypes.bool,
  }),
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
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
  elementProps: {
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
      invariant(
        props.blockOnly && context.isInAParentText,
        "Unexpected use of text block component: This component can't be used inside of a text component.",
      );
      invariant(
        props.inlineOnly && !context.isInAParentText,
        'Unexpected use of text inline component: This component can only be used inside of a text component.',
      );
    }
  }

  getChildContext() {
    return { isInAParentText: true };
  }

  getTag(tag) {
    if (tag) return tag;

    if (!this.context.isInAParentText) return 'div';

    return 'span';
  }

  render() {
    const {
      children,
      elementProps: {
        class: utils,
        align,
        color,
        mark,
        small,
        underline,
        bold,
        italic,
        ...elementProps
      },
      tag,
      className,
    } = this.props;

    const Tag = this.getTag(tag);

    const classes = cx(
      // add yoga styles
      this.context.isInAParentText ? 'yoga-text-inline' : 'yoga-text-block',
      // variable classes
      color && `text-${color}`,
      align && `text-${align}`,
      mark && 'mark',
      small && 'small',
      // add (mostly) bootstrap styles
      className,
      // add utils styles
      utils.join(' '),
    );

    // wrap children with underline, bold and italic tags
    const childrenWithU = underline ? <u>{children}</u> : children;
    const childrenWithUB = bold ? <strong>{childrenWithU}</strong> : childrenWithU;
    const childrenWithUBI = italic ? <em>{childrenWithUB}</em> : childrenWithUB;

    return (
      <Tag {...elementProps} className={classes}>
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