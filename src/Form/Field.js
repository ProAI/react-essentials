import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
  info: PropTypes.string,
  // redux form props
  meta: PropTypes.object.isRequired,
};

const defaultProps = {
  info: null,
};

function Field({ children, info, meta }) {
  return (
    <fieldset className="form-group">
      {children}
      {meta.error &&
        <div className="form-text text-danger">
          {meta.error}
        </div>}
      {info &&
        <div className="form-text text-muted">
          {info}
        </div>}
    </fieldset>
  );
}

Field.propTypes = propTypes;
Field.defaultProps = defaultProps;

export default Field;
