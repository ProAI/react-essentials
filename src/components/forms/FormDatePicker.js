import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import DayPicker from 'react-day-picker/DayPicker';
import Field from './Field';
import { SIZES } from '../../utils/constants';
import useIdentifier from '../../hooks/useIdentifier';
import useFormField from './useFormField';
import setRef from '../../utils/setRef';
import useOutsidePress from '../../hooks/useOutsidePress';
import FieldPropTypes from './FieldPropTypes';

const propTypes = {
  ...FieldPropTypes,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(SIZES),
  autoFocus: PropTypes.bool,
  formatValue: PropTypes.func,
};

const useMenuConvenienceEffects = ({ ref: menu, active }) => {
  useEffect(() => {
    if (!active) {
      return undefined;
    }

    // Set tabindex of wrapper element to -1, so that nav buttons are
    // selected directly.
    const wrapper = menu.current.getElementsByClassName('DayPicker-wrapper')[0];
    wrapper.tabIndex = -1;

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

    document.addEventListener('click', onDocumentClick);

    return () => {
      document.removeEventListener('click', onDocumentClick);
    };
  }, [active]);
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

  useOutsidePress({
    insideRefs: [control, menu],
    active: isMenuOpen,
    onPress: () => {
      setMenuOpen(false);
    },
  });

  useMenuConvenienceEffects({
    ref: menu,
    active: isMenuOpen,
  });

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
    <Field error={formatError(field.error)} touched={field.touched} info={info}>
      {title && (
        <label htmlFor={`${identifier}-${name}`} className="form-control-label">
          {title}
        </label>
      )}
      <div className={classes}>
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
            setMenuOpen(true);
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
                  setMenuOpen(false);
                }
              }}
              onDayClick={nextValue => {
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
