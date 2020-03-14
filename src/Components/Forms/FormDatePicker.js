import React, { useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import DayPicker from 'react-day-picker/DayPicker';
import Field from './Field';
import { SIZES } from '../../utils/constants';
import useIdentifier from '../../hooks/useIdentifier';
import useFormField from './useFormField';
import setRef from '../../utils/setRef';
import FieldPropTypes from './FieldPropTypes';

const propTypes = {
  ...FieldPropTypes,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(SIZES),
  autoFocus: PropTypes.bool,
  formatValue: PropTypes.func,
};

const FormDatePicker = React.forwardRef(function FormDatePicker(props, ref) {
  const {
    name,
    title,
    placeholder = '',
    size,
    info,
    autoFocus = false,
    onValueChange,
    formatValue = value => (value ? value.toLocaleDateString('en') : ''),
    formatError = error => error,
  } = props;

  const identifier = useIdentifier('re-form-');
  const field = useFormField(name);

  const control = useRef();
  const menu = useRef();

  const [isMenuOpen, setMenuOpen] = useState(false);

  const openMenu = useCallback(() => {
    setMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    field.setTouched();

    setMenuOpen(false);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    // Set tabindex of wrapper element to -1, so that nav buttons are
    // selected directly.
    document.getElementsByClassName('DayPicker-wrapper')[0].tabIndex = -1;

    // Scroll to bottom of menu for better usability.
    const menuRect = menu.current.getBoundingClientRect();
    if (window.innerHeight < menuRect.bottom) {
      window.scrollBy(0, menuRect.bottom - window.innerHeight);
    }

    // Blur on month change
    const onDocumentClick = event => {
      if (event.target.className.includes('DayPicker-NavButton')) {
        event.target.blur();
      }
    };

    // Close dropdown if user clicks on document
    const onDocumentMouseDown = event => {
      const isControlElement =
        event.target === control.current ||
        control.current.contains(event.target);

      const isMenuElement =
        event.target === menu.current || menu.current.contains(event.target);

      if (!isMenuElement && !isControlElement) {
        closeMenu();
      }
    };

    document.addEventListener('click', onDocumentClick);
    document.addEventListener('mousedown', onDocumentMouseDown);

    return () => {
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('mousedown', onDocumentMouseDown);
    };
  }, [isMenuOpen]);

  const inputClasses = cx(
    // constant classes
    'form-control',
    'form-datepicker-control',
    // variable classes
    isMenuOpen && 'focus',
    field.touched && field.error && 'is-invalid',
    size === 'sm' && 'form-control-sm',
    size === 'lg' && 'form-control-lg',
  );

  /* eslint-disable jsx-a11y/label-has-for, jsx-a11y/no-autofocus */
  return (
    <Field error={formatError(field.error)} touched={field.touched} info={info}>
      {title && (
        <label htmlFor={`${identifier}-${name}`} className="form-control-label">
          {title}
        </label>
      )}
      <div className="form-datepicker">
        <input
          ref={element => {
            control.current = element;
            setRef(ref, element);
          }}
          type="text"
          id={`${identifier}-${name}`}
          name={name}
          value={formatValue(field.value)}
          onFocus={() => {
            openMenu();
          }}
          onKeyDown={event => {
            // prevent native submitting on enter
            if (event.keyCode === 13) {
              event.preventDefault();
            }
          }}
          placeholder={placeholder}
          className={inputClasses}
          autoFocus={autoFocus}
          readOnly
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
              onDayKeyDown={(nextValue, modifiers, event) => {
                // close dropdown on tab press
                if (event.keyCode === 9) {
                  closeMenu();
                }
              }}
              onDayClick={nextValue => {
                // set value
                field.setValue(nextValue, onValueChange);

                // close dropdown
                closeMenu();
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
