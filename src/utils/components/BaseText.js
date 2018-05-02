import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'fbjs/lib/invariant';
import cx from 'classnames';
import { UTILS } from '../constants';

const propTypes = {
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  className: PropTypes.string.isRequired,
  class: PropTypes.arrayOf(UTILS),
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
  tag: null,
  class: null,
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
      tag, className, class: utils, ...attributes
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

    return <Tag className={classes} {...attributes} />;
  }
}

BaseText.propTypes = propTypes;
BaseText.contextTypes = contextTypes;
BaseText.childContextTypes = childContextTypes;
BaseText.defaultProps = defaultProps;

export default BaseText;
