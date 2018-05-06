import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'fbjs/lib/invariant';
import cx from 'classnames';
import { UTILS } from '../constants';

const propTypes = {
  children: PropTypes.node,
  props: PropTypes.shape({
    class: PropTypes.arrayOf(UTILS),
  }),
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  className: PropTypes.string.isRequired,
  withoutChildren: PropTypes.bool,
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
  withoutChildren: false,
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
      children,
      props: { class: utils, ...otherProps },
      tag: Tag,
      className,
      withoutChildren,
    } = this.props;

    // check children
    if (process.env.NODE_ENV !== 'production') {
      invariant(withoutChildren && children, 'This component does not allow a children prop.');
      invariant(!withoutChildren && !children, 'Children prop is missing in component.');

      React.Children.toArray(this.props.children).forEach((item) => {
        invariant(
          typeof item !== 'string',
          `Unexpected text node: ${item}. A text node cannot be a child of a <View>.`,
        );
      });
    }

    const classes = cx(
      // add yoga layout styles
      'yoga-view',
      // add (mostly) bootstrap styles
      className,
      // add utils styles
      utils.join(' '),
    );

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
