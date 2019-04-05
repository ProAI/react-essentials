/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/role-has-required-aria-props */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import DayPicker from 'react-day-picker/DayPicker';
import { Field as FormikField } from 'formik';
import Field from './Field';
import Context from '../../Context';

const propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  info: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
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

class FormDatePicker extends React.Component {
  static contextType = Context;

  constructor(props, context) {
    super(props, context);

    this.identifier = context.generateKey('re-form-');

    this.renderField = this.renderField.bind(this);
  }

  state = {
    isFocused: false,
    isOpen: false,
  };

  componentDidUpdate() {
    const { state } = this;

    // if field is active, set focus on tabIndex element
    if (state.isFocused) {
      this.input.focus();
    }

    // scroll to bottom of menu
    if (state.isOpen) {
      const menuRect = this.menu.getBoundingClientRect();
      if (window.innerHeight < menuRect.bottom) {
        window.scrollBy(0, menuRect.bottom - window.innerHeight);
      }
    }
  }

  componentWillUnmount() {
    const { state } = this;

    if (state.isOpen || state.isFocused) {
      document.removeEventListener('mousedown', this.onDocumentClick);
    }
  }

  onDocumentClick = event => {
    const { state } = this;

    // close and unfocus if click is outside
    if (state.isOpen) {
      const isMenuElement =
        event.target === this.menu || this.menu.contains(event.target);
      const isControlElement =
        event.target === this.control || this.control.contains(event.target);

      if (!isMenuElement && !isControlElement) {
        this.updateState(false, false);
      }
    }

    // unfocus if click is outside
    if (!state.isOpen) {
      const isControlElement =
        event.target === this.control || this.control.contains(event.target);

      if (!isControlElement) {
        this.updateState(false, false);
      }
    }
  };

  onControlClick = event => {
    event.preventDefault();

    const { state } = this;

    // open/close dropdown
    this.updateState(!state.isOpen, true);
  };

  onControlKeyDown = event => {
    const { state } = this;

    if (!state.isOpen && event.key === 'ArrowDown') {
      this.onControlClick(event);
    }

    // Destroy datepicker dropdown by calling the onBlur() function, so that
    // the next tab element can be selected.
    if (event.key === 'Tab') {
      this.updateState(false, false);
    }
  };

  updateState = (open, focus) => {
    const { state } = this;

    const isFocused = focus !== undefined ? focus : state.isFocused;
    const isOpen = open !== undefined ? open : state.isOpen;

    if (!isFocused && !isOpen) {
      document.removeEventListener('mousedown', this.onDocumentClick);
    } else {
      document.addEventListener('mousedown', this.onDocumentClick);
    }

    if (isFocused !== state.isFocused) {
      this.setState({
        isFocused,
      });
    }

    if (isOpen !== state.isOpen) {
      this.setState({
        isOpen,
      });
    }
  };

  formatPickedDate = pickedDate => {
    const { props } = this;

    if (props.formatDate) {
      return props.formatDate(pickedDate);
    }

    return pickedDate.toLocaleDateString('en');
  };

  renderField({ form: formik }) {
    const { state } = this;

    const { name, title, placeholder, info, formatError } = this.props;

    const classes = cx(
      // constant classes
      'form-datepicker',
      'Select',
      'Select--single',
      // variable classes
      formik.touched[name] && formik.errors[name] && 'is-invalid',
      formik.values[name] && 'has-value',
      state.isFocused && 'is-focused',
      state.isOpen && 'is-open',
    );

    const pickedDate = formik.values[name]
      ? new Date(formik.values[name])
      : new Date();
    const initialMonth = new Date(
      pickedDate.getFullYear(),
      pickedDate.getMonth(),
    );

    const error = formatError
      ? formatError(formik.errors[name])
      : formik.errors[name];

    /* eslint-disable jsx-a11y/label-has-for */
    return (
      <Field error={error} touched={formik.touched[name]} info={info}>
        {title && (
          <label
            htmlFor={`${this.identifier}-${name}`}
            className="form-control-label"
          >
            {title}
          </label>
        )}
        <div className={classes}>
          <div
            ref={element => {
              this.control = element;
            }}
            className="form-datepicker-control Select-control"
            onClick={this.onControlClick}
            onKeyDown={this.onControlKeyDown}
          >
            <span className="Select-multi-value-wrapper">
              {!formik.values[name] && (
                <div className="Select-placeholder">{placeholder}</div>
              )}
              {formik.values[name] && (
                <div className="Select-value">
                  <span
                    className="Select-value-label"
                    role="option"
                    aria-selected="true"
                  >
                    {formik.values[name]
                      ? this.formatPickedDate(pickedDate)
                      : ''}
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
                ref={element => {
                  this.input = element;
                }}
                id={`${this.identifier}-${name}`}
                role="combobox"
                tabIndex="0"
                className="Select-input"
                aria-expanded={state.isOpen}
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
          {state.isOpen && (
            <div
              ref={menu => {
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
                onDayClick={day => {
                  // close dropdown
                  this.updateState(false);

                  // reset error
                  formik.setFieldError(name, null);

                  // set value
                  formik.setFieldValue(name, day);
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
  }

  render() {
    const { name } = this.props;

    return <FormikField name={name} render={this.renderField} />;
  }
}

FormDatePicker.propTypes = propTypes;
FormDatePicker.defaultProps = defaultProps;

export default FormDatePicker;
