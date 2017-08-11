import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Field from './Field';

const propTypes = {
  legend: PropTypes.string,
  options: PropTypes.array.isRequired,
  info: PropTypes.string,
  multiple: PropTypes.bool,
  size: PropTypes.oneOf(['sm']),
  // redux form props
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

const defaultProps = {
  legend: null,
  info: null,
  multiple: false,
  size: null,
};

function FormChoice({ legend, options, info, multiple, size, input, meta }) {
  let index = 0;

  const getIndex = () => index;

  const increaseIndex = () => {
    index += 1;
  };

  const check = multiple ? 'checkbox' : 'radio';
  const classes = cx(`custom-control custom-${check}`, {
    'custom-control-sm': size === 'sm',
  });

  return (
    <Field meta={meta} info={info}>
      {legend &&
        <legend className="form-group-legend">
          {legend}
        </legend>}
      <div className="custom-controls-stacked">
        {options.map(option =>
          (<label
            key={getIndex()}
            className={classes}
            htmlFor={`${meta.form}-${input.name}-${getIndex()}`}
          >
            {!multiple &&
              <input
                type="radio"
                id={`${meta.form}-${input.name}-${getIndex()}`}
                name={input.name}
                value={option.value}
                checked={input.value === option.value}
                onChange={(event) => {
                  const value = event.target.checked ? option.value : input.value;
                  return input.onChange(value);
                }}
                onFocus={input.onFocus}
                onBlur={() => {
                  input.onBlur(input.value);
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
                onFocus={input.onFocus}
                onBlur={() => {
                  input.onBlur(input.value);
                }}
                className="custom-control-input"
              />}
            <div className="custom-control-indicator" />
            <div className="custom-control-description">
              {option.label}
            </div>
            {increaseIndex()}
          </label>),
        )}
      </div>
    </Field>
  );
}

FormChoice.propTypes = propTypes;
FormChoice.defaultProps = defaultProps;

export default FormChoice;
