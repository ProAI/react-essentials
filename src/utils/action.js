import PropTypes from 'prop-types';
import createButtonProps from './createButtonProps';
import createLinkProps from './createLinkProps';

export default {
  propTypes: {
    to: PropTypes.string,
    onClick: PropTypes.func,
    external: PropTypes.bool,
    preventToggle: PropTypes.bool,
    keepFocus: PropTypes.bool,
  },
  defaultProps: {
    to: null,
    onClick: null,
    external: false,
    preventToggle: false,
    keepFocus: false,
  },
  createButtonProps,
  createLinkProps,
};
