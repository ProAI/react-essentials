import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Field from './Field';
import { generateKey } from '../utils';

const propTypes = {
  title: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.node,
  })).isRequired,
  info: PropTypes.string,
  multiple: PropTypes.bool,
  size: PropTypes.oneOf(['sm']),
  formatError: PropTypes.func,
  // formik props
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

const defaultProps = {
  title: null,
  info: null,
  multiple: false,
  size: null,
  formatError: null,
};

class FormChoice extends React.Component {
  constructor(props) {
    super(props);

    if (props.field.value === undefined) {
      throw Error(`There is no initial value for field "${props.field.name}"`);
    }
  }

  identifier = generateKey('re-form-');

  render() {
    const {
      title,
      options,
      info,
      multiple,
      size,
      formatError,
      field: { name, ...field },
      form,
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
      'is-invalid': form.touched[name] && form.errors[name],
    });

    const error = formatError ? formatError(form.errors[name]) : form.errors[name];

    return (
      <Field error={error} touched={form.touched[name]} info={info}>
        {title && <legend className="form-group-legend">{title}</legend>}
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
                    form.setFieldError(name, null);

                    const value = event.target.checked ? option.value : field.value;
                    form.setFieldValue(name, value);
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
                  checked={field.value ? field.value.indexOf(option.value) !== -1 : false}
                  onChange={(event) => {
                    form.setFieldError(name, null);

                    const newValue = field.value ? [...field.value] : [];
                    if (event.target.checked) {
                      newValue.push(option.value);
                    } else {
                      newValue.splice(newValue.indexOf(option.value), 1);
                    }

                    form.setFieldValue(name, newValue);
                  }}
                  onBlur={() => form.setFieldTouched(name, true)}
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
