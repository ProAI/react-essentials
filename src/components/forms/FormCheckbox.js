import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Field from './Field';
import useIdentifier from '../../hooks/useIdentifier';
import useFormField from './useFormField';
import FieldPropTypes from './FieldPropTypes';

const propTypes = {
  ...FieldPropTypes,
  label: PropTypes.node.isRequired,
};

const FormCheckbox = React.forwardRef((props, ref) => {
  const {
    name,
    title,
    label,
    info,
    disabled = false,
    onValueChange,
    formatError = (error) => error,
    ...elementProps
  } = props;

  const identifier = useIdentifier('form');
  const field = useFormField(name);

  const inputClasses = cx(
    // constant classes
    'custom-control-input',
    // variable classes
    field.touched && field.error && 'is-invalid',
  );

  /* eslint-disable jsx-a11y/label-has-for */
  return (
    <Field
      error={formatError(field.error)}
      touched={field.touched}
      info={info}
      elementProps={elementProps}
    >
      {title && <legend className="form-group-legend">{title}</legend>}
      <div className="custom-control custom-checkbox">
        <input
          ref={ref}
          type="checkbox"
          id={`${identifier}-${name}`}
          name={name}
          checked={field.value}
          value={field.value}
          onChange={(event) => {
            field.setValue(event.target.checked, onValueChange);
          }}
          onBlur={() => {
            field.setTouched();
          }}
          onKeyDown={field.handleSubmitOnEnter}
          className={inputClasses}
          disabled={disabled}
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

export default FormCheckbox;
