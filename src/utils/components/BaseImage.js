import PropTypes from 'prop-types';
import cx from 'classnames';
import createElement from 'react-native-web/dist/cjs/exports/createElement';
import invariant from 'fbjs/lib/invariant';
import checkUtilityClasses from '../checkUtilityClasses';
import createUtilityClasses from '../createUtilityClasses';

const propTypes = {
  source: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  props: PropTypes.shape({
    class: PropTypes.string,
    className: PropTypes.string,
  }),
  className: PropTypes.string.isRequired,
};

const contextTypes = {
  isInAParentText: PropTypes.bool,
};

const defaultProps = {
  props: {
    class: null,
  },
};

function BaseImage(props, context) {
  const {
    source,
    label,
    props: { class: utils, className: customClassName, ...otherProps },
    className,
  } = props;

  if (process.env.NODE_ENV !== 'production') {
    if (utils) {
      checkUtilityClasses(utils);
    }

    invariant(!context.isInAParentText, 'A view cannot be used inside of a text component');
  }

  const classes = cx(
    // add (mostly) bootstrap styles
    className,
    // add custom styles
    customClassName,
    // add utils styles
    createUtilityClasses(utils),
  );

  return createElement(
    'img',
    {
      ...otherProps,
      src: source,
      alt: label,
      className: classes,
    },
    null,
  );
}

BaseImage.propTypes = propTypes;
BaseImage.defaultProps = defaultProps;
BaseImage.contextTypes = contextTypes;

export default BaseImage;
