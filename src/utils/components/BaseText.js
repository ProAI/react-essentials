import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'fbjs/lib/invariant';
import cx from 'classnames';
import { UTILS } from '../../utils/propTypes';

const propTypes = {
  tag: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  class: PropTypes.arrayOf(UTILS),
  blockOnly: PropTypes.bool,
};

const contextTypes = {
  isInAParentText: PropTypes.bool,
};

const childContextTypes = {
  isInAParentText: PropTypes.bool,
};

const defaultProps = {
  class: null,
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

  render() {
    const {
      tag: Tag, className, class: utils, ...props
    } = this.props;

    const classes = cx(
      // add yoga styles
      'yoga-text',
      // add (mostly) bootstrap styles
      className,
      // add utils styles
      utils.join(' '),
    );

    // TODO: check if children are text nodes (either string or text components)

    return <Tag className={classes} {...props} />;
  }
}

BaseText.propTypes = propTypes;
BaseText.contextTypes = contextTypes;
BaseText.childContextTypes = childContextTypes;
BaseText.defaultProps = defaultProps;

export default BaseText;
