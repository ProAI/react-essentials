import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import cx from 'classnames';
import DayPicker from 'react-day-picker/DayPicker';
import Field from './Field';
import useIdentifier from '../../hooks/useIdentifier';

const propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  info: PropTypes.string,
  formatDate: PropTypes.func,
  formatError: PropTypes.func,
};

const defaultProps = {
  title: null,
  placeholder: '',
  info: null,
  formatDate: null,
  formatError: null,
};

// eslint-disable-next-line no-unused-vars
const FormDatePicker = React.forwardRef(function FormDatePicker(props, ref) {
  // TODO: Forward ref to some DOM tag.

  const { name, title, placeholder, info, formatError } = props;

  const identifier = useIdentifier('re-form-');
  const form = useFormikContext();

  const input = useRef();
  const menu = useRef();
  const control = useRef();

  const [isOpen, setOpen] = useState(false);
  const [isFocused, setFocused] = useState(false);

  useEffect(() => {
    const onDocumentClick = event => {
      const isControlElement =
        event.target === control.current ||
        control.current.contains(event.target);

      // close and unfocus if click is outside
      if (isOpen) {
        const isMenuElement =
          event.target === menu.current || menu.current.contains(event.target);

        if (!isMenuElement && !isControlElement) {
          setOpen(false);
          setFocused(false);
        }
      }

      // unfocus if click is outside
      if (!isOpen && !isControlElement) {
        setOpen(false);
        setFocused(false);
      }
    };

    // if field is active, set focus on tabIndex element
    if (isFocused) {
      input.current.focus();
    }

    // scroll to bottom of menu
    if (isOpen) {
      const menuRect = menu.current.getBoundingClientRect();

      if (window.innerHeight < menuRect.bottom) {
        window.scrollBy(0, menuRect.bottom - window.innerHeight);
      }
    }

    document.addEventListener('mousedown', onDocumentClick);

    return () => {
      document.removeEventListener('mousedown', onDocumentClick);
    };
  }, [isOpen]);

  const classes = cx(
    // constant classes
    'form-datepicker',
    'Select',
    'Select--single',
    // variable classes
    form.touched[name] && form.errors[name] && 'is-invalid',
    form.values[name] && 'has-value',
    isFocused && 'is-focused',
    isOpen && 'is-open',
  );

  const error = formatError
    ? formatError(form.errors[name])
    : form.errors[name];

  const formatPickedDate = pickedDate => {
    if (props.formatDate) {
      return props.formatDate(pickedDate);
    }

    return pickedDate.toLocaleDateString('en');
  };

  const pickedDate = form.values[name]
    ? new Date(form.values[name])
    : new Date();

  const initialMonth = new Date(
    pickedDate.getFullYear(),
    pickedDate.getMonth(),
  );

  /* eslint-disable jsx-a11y/role-has-required-aria-props */
  /* eslint-disable jsx-a11y/label-has-for */
  /* eslint-disable jsx-a11y/no-static-element-interactions */
  return (
    <Field error={error} touched={form.touched[name]} info={info}>
      {title && (
        <label htmlFor={`${identifier}-${name}`} className="form-control-label">
          {title}
        </label>
      )}
      <div className={classes}>
        <div
          ref={control}
          className="form-datepicker-control Select-control"
          onClick={event => {
            event.preventDefault();

            // open/close dropdown
            setOpen(!isOpen);
            setFocused(true);
          }}
          onKeyDown={event => {
            if (!isOpen && event.key === 'ArrowDown') {
              // open/close dropdown
              setOpen(true);
              setFocused(true);
            }

            // Destroy datepicker dropdown by calling the onBlur() function, so that
            // the next tab element can be selected.
            if (event.key === 'Tab') {
              setOpen(false);
              setFocused(false);
            }
          }}
        >
          <span className="Select-multi-value-wrapper">
            {!form.values[name] && (
              <div className="Select-placeholder">{placeholder}</div>
            )}
            {form.values[name] && (
              <div className="Select-value">
                <span
                  className="Select-value-label"
                  role="option"
                  aria-selected="true"
                >
                  {form.values[name] ? formatPickedDate(pickedDate) : ''}
                </span>
              </div>
            )}
            {/* TODO
                * aria-controls ...
                * aria-owns should be the id of the date list element
                * aria-activedescendant should be the id of the currently selected day element
                * aria-readonly should be true if datepicker is disabled

                * see react-select for an example
              */}
            <div
              ref={input}
              id={`${identifier}-${name}`}
              role="combobox"
              tabIndex="0"
              className="Select-input"
              aria-controls=""
              aria-expanded={isOpen}
              aria-owns=""
              aria-activedescendant=""
              aria-readonly="false"
              onFocus={() => {
                setFocused(true);
              }}
              onBlur={() => {
                form.setFieldTouched(name, true);
              }}
              style={{ border: '0px', width: '1px', display: 'inline-block' }}
            />
          </span>
        </div>
        {isOpen && (
          <div ref={menu} className="form-datepicker-menu">
            {/* TODO
             * renderDay should be used to highlight the currently selected day
             * onDayKeyDown should be used to navigate with arrow keys
             */}
            <DayPicker
              initialMonth={initialMonth}
              selectedDays={pickedDate}
              onDayClick={day => {
                // reset error
                form.setFieldError(name, null);

                // set value
                form.setFieldValue(name, day.toString());

                // close dropdown
                setOpen(false);
              }}
              firstDayOfWeek={1}
              renderDay={day => day.getDate()}
              onDayKeyDown={() => {}}
              enableOutsideDays
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
FormDatePicker.defaultProps = defaultProps;

export default FormDatePicker;
