import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Field from './Field';
import Context from '../../Context';
import withFormField from './withFormField';

const propTypes = {
  title: PropTypes.string,
  label: PropTypes.string.isRequired,
  info: PropTypes.string,
  formatError: PropTypes.func,
  fieldRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /* eslint-disable react/forbid-prop-types */
  field: PropTypes.any.isRequired,
  form: PropTypes.any.isRequired,
  /* eslint-enable */
};

const defaultProps = {
  title: null,
  info: null,
  formatError: null,
  fieldRef: null,
};

class FormCheckbox extends React.Component {
  static contextType = Context;

  constructor(props, context) {
    super(props, context);

    this.identifier = context.generateKey('re-form-');
  }

  render() {
    const {
      title,
      label,
      info,
      formatError,
      fieldRef,
      field: { name, value },
      form,
    } = this.props;

    const classes = cx(
      // constant classes
      'custom-control',
      'custom-checkbox',
    );

    const inputClasses = cx(
      // constant classes
      'custom-control-input',
      // variable classes
      form.touched[name] && form.errors[name] && 'is-invalid',
    );

    const error = formatError
      ? formatError(form.errors[name])
      : form.errors[name];

    /* eslint-disable jsx-a11y/label-has-for */
    return (
      <Field error={error} touched={form.touched[name]} info={info}>
        {title && <legend className="form-group-legend">{title}</legend>}
        <div className={classes}>
          <input
            ref={fieldRef}
            type="checkbox"
            id={`${this.identifier}-${name}`}
            name={name}
            checked={value || false}
            onChange={event => {
              form.setFieldError(name, null);
              form.handleChange(event);
            }}
            onBlur={form.handleBlur}
            onKeyDown={event => {
              // Submit form on enter
              if (event.keyCode === 13) {
                event.preventDefault();

                form.submitForm();
              }
            }}
            className={inputClasses}
          />
          <label
            className="custom-control-label"
            htmlFor={`${this.identifier}-${name}`}
          >
            {label}
          </label>
        </div>
      </Field>
    );
    /* eslint-enable */
  }
}

FormCheckbox.propTypes = propTypes;
FormCheckbox.defaultProps = defaultProps;

export default withFormField(FormCheckbox);
