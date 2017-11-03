import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.node,
  touched: PropTypes.bool,
  info: PropTypes.string,
};

const defaultProps = {
  error: null,
  touched: false,
  info: null,
};

function Field({
  children, error, touched, info,
}) {
  return (
    <fieldset className="form-group">
      {children}
      {touched && error && <div className="form-text text-danger">{error}</div>}
      {info && <div className="form-text text-muted">{info}</div>}
    </fieldset>
  );
}

Field.propTypes = propTypes;
Field.defaultProps = defaultProps;

export default Field;
