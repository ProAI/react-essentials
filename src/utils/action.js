import PropTypes from 'prop-types';

export default {
  propTypes: {
    to: PropTypes.string,
    replace: PropTypes.bool,
    external: PropTypes.bool,
    onClick: PropTypes.func,
    keepFocus: PropTypes.bool,
  },
  defaultProps: {
    to: null,
    replace: false,
    external: false,
    onClick: null,
    keepFocus: false,
  },
};
