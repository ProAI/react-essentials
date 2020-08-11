import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Field from './Field';
import useIdentifier from '../../hooks/useIdentifier';
import useFormField from './useFormField';
import FieldPropTypes from './FieldPropTypes';

const propTypes = {
  ...FieldPropTypes,
  label: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
};

const FormFileInput = React.forwardRef(function FormFileInput(props, ref) {
  const {
    name,
    title,
    label,
    multiple = false,
    info,
    onValueChange,
    formatError = error => error,
    ...elementProps
  } = props;

  const identifier = useIdentifier('form');
  const field = useFormField(name);

  const inputClasses = cx(
    // constant classes
    'custom-file-input',
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
      <div className="custom-file">
        <input
          ref={ref}
          type="file"
          id={`${identifier}-${name}`}
          name={name}
          multiple={multiple}
          onChange={event => {
            field.setValue(event.target.files, onValueChange);
          }}
          onBlur={() => {
            field.setTouched();
          }}
          className={inputClasses}
        />
        <label className="custom-file-label" htmlFor={`${identifier}-${name}`}>
          {(field.value && field.value[0] && field.value[0].name) || label}
        </label>
      </div>
    </Field>
  );
  /* eslint-enable */
});

FormFileInput.displayName = 'FormFileInput';
FormFileInput.propTypes = propTypes;

export default FormFileInput;
