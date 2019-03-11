import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Field from './Field';
import { contextTypes as essentialsContextTypes } from '../../utils';

const propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.node,
    }),
  ).isRequired,
  info: PropTypes.string,
  multiple: PropTypes.bool,
  size: PropTypes.oneOf(['sm']),
  formatError: PropTypes.func,
};

const contextTypes = {
  ...essentialsContextTypes,
  // eslint-disable-next-line react/forbid-prop-types
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

    this.identifier = context.essentials.generateKey('re-form-');

    if (context.formik.values[props.name] === undefined) {
      throw Error(`There is no initial value for field "${props.name}"`);
    }
  }

  render() {
    const { name, title, options, info, multiple, size, formatError } = this.props;

    const { formik } = this.context;

    let index = 0;

    const getIndex = () => index;

    const increaseIndex = () => {
      index += 1;
    };

    const check = multiple ? 'checkbox' : 'radio';

    const classes = cx(
      // constant classes
      'custom-control',
      `custom-${check}`,
      // variable classes
      size === 'sm' && 'custom-control-sm',
    );

    const inputClasses = cx(
      // constant classes
      'custom-control-input',
      // variable classes
      formik.touched[name] && formik.errors[name] && 'is-invalid',
    );

    const error = formatError ? formatError(formik.errors[name]) : formik.errors[name];

    /* eslint-disable jsx-a11y/label-has-for */
    return (
      <Field error={error} touched={formik.touched[name]} info={info}>
        {title && <legend className="form-group-legend">{title}</legend>}
        <div className="custom-controls-stacked">
          {options.map(option => (
            <div key={getIndex()} className={classes}>
              {!multiple && (
                <input
                  type="radio"
                  id={`${this.identifier}-${name}-${getIndex()}`}
                  name={name}
                  value={option.value}
                  checked={formik.values[name] === option.value}
                  onChange={event => {
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
                  onChange={event => {
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
              <label
                className="custom-control-label"
                htmlFor={`${this.identifier}-${name}-${getIndex()}`}
              >
                {option.label}
              </label>
              {increaseIndex()}
            </div>
          ))}
        </div>
      </Field>
    );
    /* eslint-enable */
  }
}

FormChoice.propTypes = propTypes;
FormChoice.contextTypes = contextTypes;
FormChoice.defaultProps = defaultProps;

export default FormChoice;
