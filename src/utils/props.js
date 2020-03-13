import PropTypes from 'prop-types';

export const actionPropTypes = {
  to: PropTypes.string,
  replace: PropTypes.bool,
  external: PropTypes.bool,
  onPress: PropTypes.func,
  keepFocus: PropTypes.bool,
};

export const actionDefaultProps = {
  to: null,
  replace: false,
  external: false,
  onPress: null,
  keepFocus: false,
};
