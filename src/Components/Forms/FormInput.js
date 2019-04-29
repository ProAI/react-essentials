import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Field as FormikField } from 'formik';
import Field from './Field';
import Context from '../../Context';
import { SIZES } from '../../utils/constants';

const propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf([
    'color',
    'email',
    'number',
    'password',
    'range',
    'tel',
    'text',
    'url',
  ]),
  size: PropTypes.oneOf(SIZES),
  info: PropTypes.string,
  multiline: PropTypes.bool,
  autoFocus: PropTypes.bool,
  formatError: PropTypes.func,
};

const defaultProps = {
  title: null,
  placeholder: '',
  type: 'text',
  size: null,
  info: null,
  multiline: false,
  autoFocus: false,
  formatError: null,
};

class FormInput extends React.Component {
  static contextType = Context;

  constructor(props, context) {
    super(props, context);

    this.identifier = context.generateKey('re-form-');

    this.renderField = this.renderField.bind(this);
  }

  renderField({ form: formik }) {
    const {
      name,
      title,
      placeholder,
      type,
      size,
      info,
      multiline,
      autoFocus,
      formatError,
    } = this.props;

    const inputClasses = cx(
      // constant classes
      'form-control',
      // variable classes
      formik.touched[name] && formik.errors[name] && 'is-invalid',
      size === 'sm' && 'form-control-sm',
      size === 'lg' && 'form-control-lg',
    );

    const error = formatError
      ? formatError(formik.errors[name])
      : formik.errors[name];

    /* eslint-disable jsx-a11y/label-has-for */
    /* eslint-disable jsx-a11y/no-autofocus */
    return (
      <Field error={error} touched={formik.touched[name]} info={info}>
        {title && (
          <label
            htmlFor={`${this.identifier}-${name}`}
            className="form-control-label"
          >
            {title}
          </label>
        )}
        {!multiline && (
          <input
            type={type}
            id={`${this.identifier}-${name}`}
            name={name}
            value={formik.values[name] || ''}
            onChange={event => {
              formik.setFieldError(name, null);

              formik.handleChange(event);
            }}
            onBlur={formik.handleBlur}
            placeholder={placeholder}
            className={inputClasses}
            autoFocus={autoFocus}
          />
        )}
        {multiline && (
          <textarea
            id={`${this.identifier}-${name}`}
            name={name}
            value={formik.values[name] || ''}
            onChange={event => {
              formik.setFieldError(name, null);

              formik.handleChange(event);
            }}
            onBlur={formik.handleBlur}
            placeholder={placeholder}
            rows="7"
            className={inputClasses}
            autoFocus={autoFocus}
          />
        )}
      </Field>
    );
    /* eslint-enable */
  }

  render() {
    const { name } = this.props;

    return <FormikField name={name} render={this.renderField} />;
  }
}

FormInput.propTypes = propTypes;
FormInput.defaultProps = defaultProps;

export default FormInput;
