import PropTypes from 'prop-types';

export default {
  essentials: PropTypes.shape({
    ssrViewport: PropTypes.string,
    breakpoints: PropTypes.shape({
      xs: PropTypes.number,
      sm: PropTypes.number,
      md: PropTypes.number,
      lg: PropTypes.number,
      xl: PropTypes.number,
    }),
    generateKey: PropTypes.func,
  }).isRequired,
};
