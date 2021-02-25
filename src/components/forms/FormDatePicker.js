import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import DayPicker from 'react-day-picker/DayPicker';
import Field from './Field';
import { SIZES } from '../../utils/constants';
import useIdentifier from '../../hooks/useIdentifier';
import useFormField from './useFormField';
import setRef from '../../utils/setRef';
import useOutsidePress from '../../hooks/useOutsidePress';
import useDatePickerEffects from './useDatePickerEffects';
import useDatePickerLocale from './useDatePickerLocale';
import FieldPropTypes from './FieldPropTypes';

const propTypes = {
  ...FieldPropTypes,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(SIZES),
  locale: PropTypes.string,
  autoFocus: PropTypes.bool,
};

const FormDatePicker = React.forwardRef((props, ref) => {
  const {
    name,
    title,
    placeholder = '',
    size,
    locale = 'en',
    info,
    autoFocus = false,
    disabled = false,
    onValueChange,
    formatError = (error) => error,
    ...elementProps
  } = props;

  const identifier = useIdentifier('form');
  const field = useFormField(name);

  const control = useRef();
  const menu = useRef();

  const [isMenuOpen, setMenuOpen] = useState(false);

  useOutsidePress({
    insideRefs: [control, menu],
    active: isMenuOpen,
    onPress: () => {
      setMenuOpen(false);
    },
  });

  useDatePickerEffects({
    ref: menu,
    active: isMenuOpen,
  });

  const localeUtils = useDatePickerLocale(locale);

  const classes = cx(
    // constant classes
    'form-datepicker',
    // variable classes
    isMenuOpen && 'show',
  );

  const inputClasses = cx(
    // constant classes
    'form-control',
    'form-datepicker-control',
    // variable classes
    field.touched && field.error && 'is-invalid',
    size === 'sm' && 'form-control-sm',
    size === 'lg' && 'form-control-lg',
  );

  /* eslint-disable jsx-a11y/label-has-for, jsx-a11y/no-autofocus */
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
      <div className={classes}>
        <input
          ref={(element) => {
            control.current = element;
            setRef(ref, element);
          }}
          type="text"
          id={`${identifier}-${name}`}
          name={name}
          value={field.value ? field.value.toLocaleDateString(locale) : ''}
          onFocus={() => {
            setMenuOpen(true);
          }}
          onKeyDown={(event) => {
            // prevent native submitting on enter
            if (event.keyCode === 13) {
              event.preventDefault();
            }
          }}
          placeholder={placeholder}
          className={inputClasses}
          autoFocus={autoFocus}
          readOnly
          disabled={disabled}
        />
        {isMenuOpen && (
          <div
            ref={menu}
            className="form-datepicker-menu"
            aria-labelledby={`${identifier}-${name}`}
          >
            <DayPicker
              firstDayOfWeek={1}
              selectedDays={field.value}
              initialMonth={field.value || undefined}
              localeUtils={localeUtils}
              onDayKeyDown={(nextValue, modifiers, event) => {
                // close dropdown on tab press
                if (event.keyCode === 9) {
                  setMenuOpen(false);
                }
              }}
              onDayClick={(nextValue) => {
                // set value
                field.setValue(nextValue, onValueChange);

                // close dropdown
                setMenuOpen(false);
              }}
            />
          </div>
        )}
      </div>
    </Field>
  );
  /* eslint-enable */
});

FormDatePicker.displayName = 'FormDatePicker';
FormDatePicker.propTypes = propTypes;

export default FormDatePicker;
