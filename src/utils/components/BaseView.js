import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'fbjs/lib/invariant';
import cx from 'classnames';
import { UTILS } from '../../utils/propTypes';

const propTypes = {
  children: PropTypes.node.isRequired,
  tag: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  class: PropTypes.arrayOf(UTILS),
  blockOnly: PropTypes.bool,
};

const contextTypes = {
  isInAParentText: PropTypes.bool,
};

const defaultProps = {
  class: null,
  blockOnly: false,
};

function BaseView({
  children, tag: Tag, className, class: utils, ...props
}) {
  const classes = cx(
    // add yoga layout styles
    'yoga',
    // add (mostly) bootstrap styles
    className,
    // add utils styles
    utils.join(' '),
  );

  if (process.env.NODE_ENV !== 'production') {
    React.Children.toArray(this.props.children).forEach((item) => {
      invariant(
        typeof item !== 'string',
        `Unexpected text node: ${item}. A text node cannot be a child of a <View>.`,
      );
    });
  }

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
}

BaseView.propTypes = propTypes;
BaseView.contextTypes = contextTypes;
BaseView.defaultProps = defaultProps;

export default BaseView;
