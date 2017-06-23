import React from 'react';
import PropTypes from 'prop-types';
import Field from './Field';

const propTypes = {
  legend: PropTypes.string,
  options: PropTypes.array.isRequired,
  info: PropTypes.string,
  multiple: PropTypes.bool,
  // redux form props
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

const defaultProps = {
  legend: null,
  info: null,
  multiple: false,
};

function FormChoice({ legend, options, info, multiple, input, meta }) {
  let index = 0;

  const getIndex = () => index;

  const increaseIndex = () => {
    index += 1;
  };

  const check = multiple ? 'checkbox' : 'radio';

  return (
    <Field meta={meta} info={info}>
      {legend && <legend className="form-group-legend">{legend}</legend>}
      {options.map(option =>
        (<div className={check} key={getIndex()}>
          <label
            className={`custom-control custom-${check}`}
            htmlFor={`${meta.form}-${input.name}-${getIndex()}`}
          >
            {!multiple &&
              <input
                {...input}
                type="radio"
                id={`${meta.form}-${input.name}-${getIndex()}`}
                name={input.name}
                value={option.value}
                checked={input.value === option.value}
                onChange={(event) => {
                  const value = event.target.checked ? option.value : input.value;
                  return input.onChange(value);
                }}
                className="custom-control-input"
              />}
            {multiple &&
              <input
                type="checkbox"
                id={`${meta.form}-${input.name}-${getIndex()}`}
                name={`${input.name}[${getIndex()}]`}
                value={option.value}
                checked={input.value.indexOf(option.value) !== -1}
                onChange={(event) => {
                  const newValue = [...input.value];
                  if (event.target.checked) {
                    newValue.push(option.value);
                  } else {
                    newValue.splice(newValue.indexOf(option.value), 1);
                  }

                  return input.onChange(newValue);
                }}
                className="custom-control-input"
              />}
            <div className="custom-control-indicator" />
            <div className="custom-control-description">{option.label}</div>
          </label>
          {increaseIndex()}
        </div>),
      )}
    </Field>
  );
}

FormChoice.propTypes = propTypes;
FormChoice.defaultProps = defaultProps;

export default FormChoice;
