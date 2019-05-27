import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Field from './Field';
import withFormField from './withFormField';
import Context from '../../Context';
import { SIZES } from '../../utils/constants';

const propTypes = {
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
  fieldRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /* eslint-disable react/forbid-prop-types */
  field: PropTypes.any.isRequired,
  form: PropTypes.any.isRequired,
  /* eslint-enable */
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
  fieldRef: null,
};

class FormInput extends React.Component {
  static contextType = Context;

  constructor(props, context) {
    super(props, context);

    this.identifier = context.generateKey('re-form-');
  }

  render() {
    const {
      title,
      placeholder,
      type,
      size,
      info,
      multiline,
      autoFocus,
      formatError,
      fieldRef,
      field: { name, value },
      form,
    } = this.props;

    const inputClasses = cx(
      // constant classes
      'form-control',
      // variable classes
      form.touched[name] && form.errors[name] && 'is-invalid',
      size === 'sm' && 'form-control-sm',
      size === 'lg' && 'form-control-lg',
    );

    const error = formatError
      ? formatError(form.errors[name])
      : form.errors[name];

    /* eslint-disable jsx-a11y/label-has-for */
    /* eslint-disable jsx-a11y/no-autofocus */
    return (
      <Field error={error} touched={form.touched[name]} info={info}>
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
            ref={fieldRef}
            type={type}
            id={`${this.identifier}-${name}`}
            name={name}
            value={value || ''}
            onChange={event => {
              form.setFieldError(name, null);

              form.handleChange(event);
            }}
            onBlur={form.handleBlur}
            onKeyDown={event => {
              // Submit form on enter
              if (event.keyCode === 13) {
                form.submitForm();
              }
            }}
            placeholder={placeholder}
            className={inputClasses}
            autoFocus={autoFocus}
          />
        )}
        {multiline && (
          <textarea
            ref={fieldRef}
            id={`${this.identifier}-${name}`}
            name={name}
            value={value || ''}
            onChange={event => {
              form.setFieldError(name, null);

              form.handleChange(event);
            }}
            onBlur={form.handleBlur}
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
}

FormInput.propTypes = propTypes;
FormInput.defaultProps = defaultProps;

export default withFormField(FormInput);
