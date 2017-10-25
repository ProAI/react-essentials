import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Field from './Field';
import { generateKey } from '../utils';

const propTypes = {
  legend: PropTypes.string,
  options: PropTypes.array.isRequired,
  info: PropTypes.string,
  multiple: PropTypes.bool,
  size: PropTypes.oneOf(['sm']),
  // formik props
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

const defaultProps = {
  legend: null,
  info: null,
  multiple: false,
  size: null,
};

class FormChoice extends React.Component {
  identifier = generateKey('re-form-');

  render() {
    const {
      legend, options, info, multiple, size, field: { name, ...field }, form,
    } = this.props;

    let index = 0;

    const getIndex = () => index;

    const increaseIndex = () => {
      index += 1;
    };

    const check = multiple ? 'checkbox' : 'radio';
    const classes = cx(`custom-control custom-${check}`, {
      'custom-control-sm': size === 'sm',
    });
    const inputClasses = cx('custom-control-input', {
      'is-invalid': form.errors[name],
    });

    return (
      <Field error={form.errors[name]} info={info}>
        {legend && <legend className="form-group-legend">{legend}</legend>}
        <div className="custom-controls-stacked">
          {options.map(option => (
            <label
              key={getIndex()}
              className={classes}
              htmlFor={`${this.identifier}-${name}-${getIndex()}`}
            >
              {!multiple && (
                <input
                  type="radio"
                  id={`${this.identifier}-${name}-${getIndex()}`}
                  name={name}
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={(event) => {
                    const value = event.target.checked ? option.value : field.value;
                    return form.setFieldValue(name, value);
                  }}
                  onBlur={() => form.setFieldTouched(name, true)}
                  className={inputClasses}
                />
              )}
              {multiple && (
                <input
                  type="checkbox"
                  id={`${this.identifier}-${name}-${getIndex()}`}
                  name={`${name}[${getIndex()}]`}
                  value={option.value}
                  checked={field.value.indexOf(option.value) !== -1}
                  onChange={(event) => {
                    const newValue = [...field.value];
                    if (event.target.checked) {
                      newValue.push(option.value);
                    } else {
                      newValue.splice(newValue.indexOf(option.value), 1);
                    }

                    return form.setFieldValue(`${name}[${getIndex()}]`, newValue);
                  }}
                  onBlur={() => form.setFieldTouched(`${name}[${getIndex()}]`, true)}
                  className={inputClasses}
                />
              )}
              <div className="custom-control-indicator" />
              <div className="custom-control-description">{option.label}</div>
              {increaseIndex()}
            </label>
          ))}
        </div>
      </Field>
    );
  }
}

FormChoice.propTypes = propTypes;
FormChoice.defaultProps = defaultProps;

export default FormChoice;
