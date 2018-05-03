import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'fbjs/lib/invariant';
import cx from 'classnames';
import { UTILS } from '../constants';

const propTypes = {
  children: PropTypes.node.isRequired,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  className: PropTypes.string.isRequired,
  class: PropTypes.arrayOf(UTILS),
  blockOnly: PropTypes.bool,
};

const contextTypes = {
  isInAParentText: PropTypes.bool,
};

const defaultProps = {
  tag: 'div',
  class: null,
  blockOnly: false,
};

class BaseView extends React.Component {
  constructor(props, context) {
    super(props, context);

    // check if in a parent text
    if (process.env.NODE_ENV !== 'production') {
      invariant(context.isInAParentText, 'A view cannot be used inside of a text component');
    }
  }

  render() {
    const {
      children, tag: Tag, className, class: utils, ...otherProps
    } = this.props;

    const classes = cx(
      // add yoga layout styles
      'yoga-view',
      // add (mostly) bootstrap styles
      className,
      // add utils styles
      utils.join(' '),
    );

    // check children
    if (process.env.NODE_ENV !== 'production') {
      React.Children.toArray(this.props.children).forEach((item) => {
        invariant(
          typeof item !== 'string',
          `Unexpected text node: ${item}. A text node cannot be a child of a <View>.`,
        );
      });
    }
    return (
      <Tag {...otherProps} className={classes}>
        {children}
      </Tag>
    );
  }
}

BaseView.propTypes = propTypes;
BaseView.contextTypes = contextTypes;
BaseView.defaultProps = defaultProps;

export default BaseView;
