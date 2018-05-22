import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'fbjs/lib/invariant';
import cx from 'classnames';
import createElement from 'react-native-web/dist/exports/createElement';
import checkUtilityClasses from '../checkUtilityClasses';

const propTypes = {
  children: PropTypes.node,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  props: PropTypes.shape({
    class: PropTypes.string,
    className: PropTypes.string,
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

class BaseView extends React.Component {
  constructor(props, context) {
    super(props, context);

    // check if in a parent text
    if (process.env.NODE_ENV !== 'production') {
      invariant(!context.isInAParentText, 'A view cannot be used inside of a text component');
    }
  }

  render() {
    const {
      children,
      props: { class: utils, className: customClassName, ...otherProps },
      tag,
      className,
      pseudo,
    } = this.props;

    // check children
    if (process.env.NODE_ENV !== 'production') {
      if (utils) {
        checkUtilityClasses(utils);
      }

      React.Children.toArray(this.props.children).forEach((item) => {
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

    return createElement(tag, { ...otherProps, className: classes }, children);
  }
}

BaseView.propTypes = propTypes;
BaseView.contextTypes = contextTypes;
BaseView.defaultProps = defaultProps;

export default BaseView;
