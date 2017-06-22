import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

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
  const fieldsetClasses = cx('form-group', { 'has-danger': meta.error });
  return (
    <fieldset className={fieldsetClasses}>
      {children}
      {meta.error &&
        <div className="text-danger">
          {meta.error}
        </div>}
      {info &&
        <div className="text-muted">
          {info}
        </div>}
    </fieldset>
  );
}

Field.propTypes = propTypes;
Field.defaultProps = defaultProps;

export default Field;
