import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Field from './Field';
import { generateKey } from '../../utils';

const propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['color', 'email', 'number', 'password', 'range', 'tel', 'text', 'url']),
  size: PropTypes.oneOf(['sm']),
  info: PropTypes.string,
  multiline: PropTypes.bool,
  autoFocus: PropTypes.bool,
  formatError: PropTypes.func,
};

const contextTypes = {
  formik: PropTypes.object.isRequired,
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
  constructor(props, context) {
    super(props, context);

    if (context.formik.values[props.name] === undefined) {
      throw Error(`There is no initial value for field "${props.name}"`);
    }
  }

  identifier = generateKey('re-form-');

  render() {
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

    const { formik } = this.context;

    const inputClasses = cx('form-control', {
      'is-invalid': formik.touched[name] && formik.errors[name],
      'form-control-sm': size === 'sm',
    });

    const error = formatError ? formatError(formik.errors[name]) : formik.errors[name];

    /* eslint-disable jsx-a11y/no-autofocus */
    return (
      <Field error={error} touched={formik.touched[name]} info={info}>
        {title && (
          <label htmlFor={`${this.identifier}-${name}`} className="form-control-label">
            {title}
          </label>
        )}
        {!multiline && (
          <input
            type={type}
            id={`${this.identifier}-${name}`}
            name={name}
            value={formik.values[name] || ''}
            onChange={(event) => {
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
            onChange={(event) => {
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
}

FormInput.propTypes = propTypes;
FormInput.contextTypes = contextTypes;
FormInput.defaultProps = defaultProps;

export default FormInput;
