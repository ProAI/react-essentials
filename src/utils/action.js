import PropTypes from 'prop-types';
import createHandleClick from './createHandleClick';
import createButtonProps from './createButtonProps';
import createLinkProps from './createLinkProps';

export default {
  propTypes: {
    to: PropTypes.string,
    onClick: PropTypes.func,
    external: PropTypes.bool,
    keepFocus: PropTypes.bool,
  },
  defaultProps: {
    to: null,
    onClick: null,
    external: false,
    keepFocus: false,
  },
  createHandleClick,
  createButtonProps,
  createLinkProps,
};
