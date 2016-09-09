import React, { PropTypes } from 'react';

const propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

const contextTypes = {
  form: PropTypes.string.isRequired,
};

function RadioButton({ label, value, info, input, meta }, { form }) {
  const labelClasses = classNames([
    'custom-control-description',
    { active: meta.active },
  ]);

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

export default RadioButton;
