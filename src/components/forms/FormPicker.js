import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Field from './Field';
import useIdentifier from '../../hooks/useIdentifier';
import useFormField from './useFormField';
import concatRefs from '../../utils/concatRefs';
import FieldPropTypes from './FieldPropTypes';

const propTypes = {
  ...FieldPropTypes,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      // eslint-disable-next-line react/forbid-prop-types
      value: PropTypes.any,
      label: PropTypes.node,
    }),
  ).isRequired,
};

const FormPicker = React.forwardRef((props, ref) => {
  const {
    name,
    title,
    placeholder = '',
    options,
    info,
    disabled = false,
    onValueChange,
    formatError = (error) => error,
    component: Select = 'select',
    ...elementProps
  } = props;

  const identifier = useIdentifier('form');
  const field = useFormField(name);

  const controlRef = useRef();

  const classes = cx(
    // constant classes
    'custom-select',
    // variable classes
    !field.value && 'placeholder',
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
      {title && (
        <label htmlFor={`${identifier}-${name}`} className="form-control-label">
          {title}
        </label>
      )}
      <Select
        ref={concatRefs(controlRef, ref)}
        id={`${identifier}-${name}`}
        name={name}
        value={field.value || ''}
        onChange={(event) => {
          field.setValue(event.target.value, onValueChange);
        }}
        onBlur={() => {
          field.setTouched();
        }}
        className={classes}
        disabled={disabled}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </Field>
  );
  /* eslint-enable */
});

FormPicker.displayName = 'FormPicker';
FormPicker.propTypes = propTypes;

export default FormPicker;
