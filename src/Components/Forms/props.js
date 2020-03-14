import PropTypes from 'prop-types';

export const formFieldPropTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  info: PropTypes.string,
  onValueChange: PropTypes.func,
  formatError: PropTypes.func,
};

export const formFieldDefaultProps = {
  title: null,
  info: null,
  onValueChange: null,
  formatError: error => error,
};
