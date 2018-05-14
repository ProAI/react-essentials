import PropTypes from 'prop-types';
import cx from 'classnames';
import createElement from 'react-native-web/dist/exports/createElement';
import checkUtilityClasses from '../checkUtilityClasses';

const propTypes = {
  source: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  props: PropTypes.shape({
    class: PropTypes.string,
    className: PropTypes.string,
  }),
  className: PropTypes.string.isRequired,
};

const defaultProps = {
  props: {
    class: null,
  },
};

function BaseImage(props) {
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
  }

  const classes = cx(
    // add (mostly) bootstrap styles
    className,
    // add custom styles
    customClassName,
    // add utils styles
    utils,
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

export default BaseImage;
