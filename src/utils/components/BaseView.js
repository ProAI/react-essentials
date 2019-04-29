import React from 'react';
import PropTypes from 'prop-types';
import ViewPropTypes from 'react-native-web/dist/cjs/exports/View/ViewPropTypes';
import invariant from 'fbjs/lib/invariant';
import cx from 'classnames';
import createDOMProps from '../createDOMProps';
import checkUtilityClasses from '../checkUtilityClasses';
import createUtilityClasses from '../createUtilityClasses';

const propTypes = {
  children: PropTypes.node,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  props: PropTypes.shape({
    ...ViewPropTypes,
    styleName: PropTypes.string,
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
    styleName: null,
  },
  tag: 'div',
  pseudo: false,
};

function BaseView(props, context) {
  const {
    children,
    props: { styleName: utils, className: customClassName, ...otherProps },
    tag: Tag,
    className,
    pseudo,
  } = props;

  // checks
  if (process.env.NODE_ENV !== 'production') {
    if (utils) {
      checkUtilityClasses(utils);
    }

    invariant(
      !context.isInAParentText,
      'A view cannot be used inside of a text component',
    );

    React.Children.toArray(children).forEach(item => {
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
    createUtilityClasses(utils),
  );

  return (
    <Tag {...createDOMProps({ ...otherProps, className: classes })}>
      {children}
    </Tag>
  );
}

BaseView.propTypes = propTypes;
BaseView.contextTypes = contextTypes;
BaseView.defaultProps = defaultProps;

export default BaseView;
