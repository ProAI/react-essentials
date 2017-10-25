import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string.isRequired,
  info: PropTypes.string,
};

const defaultProps = {
  info: null,
};

function Field({ children, error, info }) {
  return (
    <fieldset className="form-group">
      {children}
      {error && <div className="form-text text-danger">{error}</div>}
      {info && <div className="form-text text-muted">{info}</div>}
    </fieldset>
  );
}

Field.propTypes = propTypes;
Field.defaultProps = defaultProps;

export default Field;
