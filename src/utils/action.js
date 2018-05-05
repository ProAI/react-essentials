import PropTypes from 'prop-types';
import createHandleClick from './createHandleClick';
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
  contextTypes: {
    onToggle: PropTypes.func,
  },
  defaultProps: {
    to: null,
    onClick: null,
    external: false,
    preventToggle: false,
    keepFocus: false,
  },
  createHandleClick,
  createButtonProps,
  createLinkProps,
};
