import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Field from './Field';
import useIdentifier from '../../hooks/useIdentifier';
import useFormField from './useFormField';
import { formFieldPropTypes, formFieldDefaultProps } from './props';

const propTypes = {
  ...formFieldPropTypes,
  label: PropTypes.string.isRequired,
};

const defaultProps = {
  ...formFieldDefaultProps,
};

const FormCheckbox = React.forwardRef(function FormCheckbox(props, ref) {
  const { name, title, label, info, onValueChange, formatError } = props;

  const identifier = useIdentifier('re-form-');
  const field = useFormField(name);

  const classes = cx(
    // constant classes
    'custom-control',
    'custom-checkbox',
  );

  const inputClasses = cx(
    // constant classes
    'custom-control-input',
    // variable classes
    field.touched && field.error && 'is-invalid',
  );

  /* eslint-disable jsx-a11y/label-has-for */
  return (
    <Field error={formatError(field.error)} touched={field.touched} info={info}>
      {title && <legend className="form-group-legend">{title}</legend>}
      <div className={classes}>
        <input
          ref={ref}
          type="checkbox"
          id={`${identifier}-${name}`}
          name={name}
          checked={field.value}
          value={field.value}
          onChange={event => {
            field.setValue(event.target.checked, onValueChange);
          }}
          onBlur={() => {
            field.setTouched();
          }}
          onKeyDown={field.handleSubmitOnEnter}
          className={inputClasses}
        />
        <label
          className="custom-control-label"
          htmlFor={`${identifier}-${name}`}
        >
          {label}
        </label>
      </div>
    </Field>
  );
  /* eslint-enable */
});

FormCheckbox.displayName = 'FormCheckbox';
FormCheckbox.propTypes = propTypes;
FormCheckbox.defaultProps = defaultProps;

export default FormCheckbox;
