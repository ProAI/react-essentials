import React, { PropTypes } from 'react';
import cx from 'classnames';

const propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
};

const contextTypes = {
  form: PropTypes.string.isRequired,
};

const defaultProps = {
  info: null,
  input: null,
  meta: null,
};

function RadioButton({ label, value, info, input, meta }, { form }) {
  const labelClasses = cx(
    'custom-control-description',
    { active: meta.active && input.value === value },
  );

  return (
    <div className="radio">
      <label className="custom-control custom-radio" htmlFor={`${form}-${input.name}-${value}`}>
        <input
          {...input}
          id={`${form}-${input.name}-${value}`}
          type="radio"
          value={value}
          className="custom-control-input"
        />
        <div className="custom-control-indicator" />
        <div className={labelClasses}>
          {label}
          {info && (
            <div>
              <small className="text-muted">
                {info}
              </small>
            </div>
          )}
        </div>
      </label>
    </div>
  );
}

RadioButton.propTypes = propTypes;
RadioButton.contextTypes = contextTypes;
RadioButton.defaultProps = defaultProps;

export default RadioButton;
