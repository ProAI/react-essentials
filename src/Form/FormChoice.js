import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Field from './Field';
import { generateKey } from '../utils';

const propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.node,
  })).isRequired,
  info: PropTypes.string,
  multiple: PropTypes.bool,
  size: PropTypes.oneOf(['sm']),
  formatError: PropTypes.func,
};

const contextTypes = {
  formik: PropTypes.object.isRequired,
};

const defaultProps = {
  title: null,
  info: null,
  multiple: false,
  size: null,
  formatError: null,
};

class FormChoice extends React.Component {
  constructor(props, context) {
    super(props, context);

    if (context.formik.values[props.name] === undefined) {
      throw Error(`There is no initial value for field "${props.name}"`);
    }
  }

  identifier = generateKey('re-form-');

  render() {
    const {
      name, title, options, info, multiple, size, formatError,
    } = this.props;

    const { formik } = this.context;

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
      'is-invalid': formik.touched[name] && formik.errors[name],
    });

    const error = formatError ? formatError(formik.errors[name]) : formik.errors[name];

    return (
      <Field error={error} touched={formik.touched[name]} info={info}>
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
                  checked={formik.values[name] === option.value}
                  onChange={(event) => {
                    formik.setFieldError(name, null);

                    const value = event.target.checked ? option.value : formik.values[name];
                    formik.setFieldValue(name, value);
                  }}
                  onBlur={() => formik.setFieldTouched(name, true)}
                  className={inputClasses}
                />
              )}
              {multiple && (
                <input
                  type="checkbox"
                  id={`${this.identifier}-${name}-${getIndex()}`}
                  name={`${name}[${getIndex()}]`}
                  value={option.value}
                  checked={
                    formik.values[name] ? formik.values[name].indexOf(option.value) !== -1 : false
                  }
                  onChange={(event) => {
                    formik.setFieldError(name, null);

                    const newValue = formik.values[name] ? [...formik.values[name]] : [];
                    if (event.target.checked) {
                      newValue.push(option.value);
                    } else {
                      newValue.splice(newValue.indexOf(option.value), 1);
                    }

                    formik.setFieldValue(name, newValue);
                  }}
                  onBlur={() => formik.setFieldTouched(name, true)}
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
FormChoice.contextTypes = contextTypes;
FormChoice.defaultProps = defaultProps;

export default FormChoice;
