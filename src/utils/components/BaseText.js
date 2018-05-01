import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'fbjs/lib/invariant';
import cx from 'classnames';
import * as propValues from '../propValues';

const propTypes = {
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  className: PropTypes.string.isRequired,
  class: PropTypes.arrayOf(propValues.utils),
  innerRef: PropTypes.func,
  withInnerRef: PropTypes.bool,
  blockOnly: PropTypes.bool,
};

const contextTypes = {
  isInAParentText: PropTypes.bool,
};

const childContextTypes = {
  isInAParentText: PropTypes.bool,
};

const defaultProps = {
  tag: null,
  class: null,
  innerRef: null,
  withInnerRef: false,
  blockOnly: false,
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
      tag, className, class: utils, withInnerRef, innerRef, ...attributes
    } = this.props;

    const Tag = this.getTag(tag);

    const classes = cx(
      // add yoga styles
      'yoga-text',
      // add (mostly) bootstrap styles
      className,
      // add utils styles
      utils.join(' '),
    );

    const refProp = withInnerRef ? null : innerRef;
    const innerRefProp = withInnerRef ? innerRef : null;

    return <Tag className={classes} ref={refProp} innerRef={innerRefProp} {...attributes} />;
  }
}

BaseText.propTypes = propTypes;
BaseText.contextTypes = contextTypes;
BaseText.childContextTypes = childContextTypes;
BaseText.defaultProps = defaultProps;

export default BaseText;
