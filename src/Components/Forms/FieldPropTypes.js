import PropTypes from 'prop-types';

const FieldPropTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  info: PropTypes.string,
  onValueChange: PropTypes.func,
  formatError: PropTypes.func,
};

export default FieldPropTypes;
