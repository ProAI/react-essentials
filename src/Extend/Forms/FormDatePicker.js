/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/role-has-required-aria-props */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import DayPicker from 'react-day-picker/DayPicker';
import Field from '../../Components/Forms/Field';
import { generateKey } from '../../utils';

const propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  info: PropTypes.string,
  size: PropTypes.oneOf(['sm']),
  formatDate: PropTypes.func,
  formatError: PropTypes.func,
};

const contextTypes = {
  formik: PropTypes.object.isRequired,
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
  constructor(props, context) {
    super(props, context);

    this.identifier = generateKey('re-form-');

    if (context.formik.values[props.name] === undefined) {
      throw Error(`There is no initial value for field "${props.name}"`);
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
    this.context.formik.setFieldError(this.props.name, null);

    // set value
    this.context.formik.setFieldValue(this.props.name, day);
  };

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
      name, title, placeholder, info, size, formatError,
    } = this.props;

    const { formik } = this.context;

    const classes = cx(
      // constant classes
      'form-datepicker',
      'Select',
      'Select--single',
      // variable classes
      formik.touched[name] && formik.errors[name] && 'is-invalid',
      size === 'sm' && 'form-datepicker-sm',
      formik.values[name] && 'has-value',
      this.state.isFocused && 'is-focused',
      this.state.isOpen && 'is-open',
    );

    const pickedDate = formik.values[name] ? new Date(formik.values[name]) : new Date();
    const initialMonth = new Date(pickedDate.getFullYear(), pickedDate.getMonth());

    const error = formatError ? formatError(formik.errors[name]) : formik.errors[name];

    return (
      <Field error={error} touched={formik.touched[name]} info={info}>
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
            className="form-datepicker-control Select-control"
            onClick={this.onControlClick}
            onKeyDown={this.onControlKeyDown}
          >
            <span className="Select-multi-value-wrapper">
              {!formik.values[name] && <div className="Select-placeholder">{placeholder}</div>}
              {formik.values[name] && (
                <div className="Select-value">
                  <span className="Select-value-label" role="option" aria-selected="true">
                    {formik.values[name] ? this.formatPickedDate(pickedDate) : ''}
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
                onBlur={() => formik.setFieldTouched(name, true)}
                style={{ border: '0px', width: '1px', display: 'inline-block' }}
              />
            </span>
          </div>
          {this.state.isOpen && (
            <div
              ref={(menu) => {
                this.menu = menu;
              }}
              className="form-datepicker-menu"
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
FormDatePicker.contextTypes = contextTypes;
FormDatePicker.defaultProps = defaultProps;

export default FormDatePicker;
