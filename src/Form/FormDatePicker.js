/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/role-has-required-aria-props */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import DayPicker from 'react-day-picker/DayPicker';
import Field from './Field';
import { generateKey } from '../utils';

const propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  info: PropTypes.string,
  size: PropTypes.oneOf(['sm']),
  formatDate: PropTypes.func,
  formatError: PropTypes.func,
  // formik props
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

const defaultProps = {
  title: null,
  placeholder: '',
  info: null,
  size: null,
  formatDate: null,
  formatError: null,
};

class FormDatePicker extends React.Component {
  constructor(props) {
    super(props);

    if (props.field.value === undefined) {
      throw Error(`There is no initial value for field "${props.field.name}"`);
    }
  }

  state = {
    isFocused: false,
    isOpen: false,
  };

  componentDidUpdate() {
    // if field is active, set focus on tabIndex element
    if (this.state.isFocused) {
      this.input.focus();
    }

    // scroll to bottom of menu
    if (this.state.isOpen) {
      const menuRect = this.menu.getBoundingClientRect();
      if (window.innerHeight < menuRect.bottom) {
        window.scrollBy(0, menuRect.bottom - window.innerHeight);
      }
    }
  }

  componentWillUnmount() {
    if (this.state.isOpen || this.state.isFocused) {
      document.removeEventListener('mousedown', this.onDocumentClick);
    }
  }

  onDocumentClick = (event) => {
    // close and unfocus if click is outside
    if (this.state.isOpen) {
      const isMenuElement = event.target === this.menu || this.menu.contains(event.target);
      const isControlElement = event.target === this.control || this.control.contains(event.target);

      if (!isMenuElement && !isControlElement) {
        this.updateState(false, false);
      }
    }

    // unfocus if click is outside
    if (!this.state.isOpen) {
      const isControlElement = event.target === this.control || this.control.contains(event.target);

      if (!isControlElement) {
        this.updateState(false, false);
      }
    }
  };

  onControlClick = (event) => {
    event.preventDefault();

    // open/close dropdown
    this.updateState(!this.state.isOpen, true);
  };

  onControlKeyDown = (event) => {
    if (!this.state.isOpen && event.key === 'ArrowDown') {
      this.onControlClick(event);
    }

    // Destroy datepicker dropdown by calling the onBlur() function, so that
    // the next tab element can be selected.
    if (event.key === 'Tab') {
      this.updateState(false, false);
    }
  };

  onDayClick = (day) => {
    // close dropdown
    this.updateState(false);

    // reset error
    this.props.form.setFieldError(this.props.field.name, null);

    // set value
    this.props.form.setFieldValue(this.props.field.name, day);
  };

  identifier = generateKey('re-form-');

  updateState = (open, focus) => {
    const isFocused = focus !== undefined ? focus : this.state.isFocused;
    const isOpen = open !== undefined ? open : this.state.isOpen;

    if (!isFocused && !isOpen) {
      document.removeEventListener('mousedown', this.onDocumentClick);
    } else {
      document.addEventListener('mousedown', this.onDocumentClick);
    }

    if (isFocused !== this.state.isFocused) {
      this.setState({
        isFocused,
      });
    }

    if (isOpen !== this.state.isOpen) {
      this.setState({
        isOpen,
      });
    }
  };

  formatPickedDate = (pickedDate) => {
    if (this.props.formatDate) {
      return this.props.formatDate(pickedDate);
    }

    return pickedDate.toLocaleDateString('en');
  };

  render() {
    const {
      title,
      placeholder,
      info,
      size,
      formatError,
      field: { name, ...field },
      form,
    } = this.props;

    const classes = cx('form-datepicker Select Select--single', {
      'is-invalid': form.touched[name] && form.errors[name],
      'form-datepicker-sm': size === 'sm',
      'has-value': field.value,
      'is-focused': this.state.isFocused,
      'is-open': this.state.isOpen,
    });
    const controlClasses = cx('form-datepicker-control Select-control');
    const menuClasses = cx('form-datepicker-menu');

    const pickedDate = field.value ? new Date(field.value) : new Date();
    const initialMonth = new Date(pickedDate.getFullYear(), pickedDate.getMonth());

    const error = formatError ? formatError(form.errors[name]) : form.errors[name];

    return (
      <Field error={error} touched={form.touched[name]} info={info}>
        {title && (
          <label htmlFor={`${this.identifier}-${name}`} className="form-control-label">
            {title}
          </label>
        )}
        <div className={classes}>
          <div
            ref={(element) => {
              this.control = element;
            }}
            className={controlClasses}
            onClick={this.onControlClick}
            onKeyDown={this.onControlKeyDown}
          >
            <span className="Select-multi-value-wrapper">
              {!field.value && <div className="Select-placeholder">{placeholder}</div>}
              {field.value && (
                <div className="Select-value">
                  <span className="Select-value-label" role="option" aria-selected="true">
                    {field.value ? this.formatPickedDate(pickedDate) : ''}
                  </span>
                </div>
              )}
              {/* TODO
                * aria-owns should be the id of the date list element
                * aria-activedescendant should be the id of the currently selected day element
                * aria-readonly should be true if datepicker is disabled

                * see react-select for an example
              */}
              <div
                ref={(element) => {
                  this.input = element;
                }}
                id={`${this.identifier}-${name}`}
                role="combobox"
                tabIndex="0"
                className="Select-input"
                aria-expanded={this.state.isOpen}
                aria-owns=""
                aria-activedescendant=""
                aria-readonly="false"
                onFocus={() => {
                  this.updateState(undefined, true);
                }}
                onBlur={() => form.setFieldTouched(name, true)}
                style={{ border: '0px', width: '1px', display: 'inline-block' }}
              />
            </span>
          </div>
          {this.state.isOpen && (
            <div
              ref={(menu) => {
                this.menu = menu;
              }}
              className={menuClasses}
            >
              {/* TODO
              * renderDay should be used to highlight the currently selected day
              * onDayKeyDown should be used to navigate with arrow keys
            */}
              <DayPicker
                initialMonth={initialMonth}
                selectedDays={pickedDate}
                onDayClick={this.onDayClick}
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
  }
}

FormDatePicker.propTypes = propTypes;
FormDatePicker.defaultProps = defaultProps;

export default FormDatePicker;
