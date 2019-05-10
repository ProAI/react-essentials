/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/role-has-required-aria-props */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import DayPicker from 'react-day-picker/DayPicker';
import Field from './Field';
import Context from '../../Context';
import withFormField from './withFormField';

const propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  info: PropTypes.string,
  // formatDate: PropTypes.func,
  formatError: PropTypes.func,
  /* eslint-disable react/forbid-prop-types */
  field: PropTypes.any.isRequired,
  form: PropTypes.any.isRequired,
  /* eslint-enable */
};

const defaultProps = {
  title: null,
  placeholder: '',
  info: null,
  // formatDate: null,
  formatError: null,
};

class FormDatePicker extends React.Component {
  static contextType = Context;

  constructor(props, context) {
    super(props, context);

    this.identifier = context.generateKey('re-form-');
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

  render() {
    // TODO: Forward ref to some DOM tag.

    const {
      title,
      placeholder,
      info,
      formatError,
      field: { name, value },
      form,
    } = this.props;

    const { isFocused, isOpen } = this.state;

    const classes = cx(
      // constant classes
      'form-datepicker',
      'Select',
      'Select--single',
      // variable classes
      form.touched[name] && form.errors[name] && 'is-invalid',
      value && 'has-value',
      isFocused && 'is-focused',
      isOpen && 'is-open',
    );

    const pickedDate = value ? new Date(value) : new Date();
    const initialMonth = new Date(
      pickedDate.getFullYear(),
      pickedDate.getMonth(),
    );

    const error = formatError
      ? formatError(form.errors[name])
      : form.errors[name];

    /* eslint-disable jsx-a11y/label-has-for */
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <Field error={error} touched={form.touched[name]} info={info}>
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
              {!value && (
                <div className="Select-placeholder">{placeholder}</div>
              )}
              {value && (
                <div className="Select-value">
                  <span
                    className="Select-value-label"
                    role="option"
                    aria-selected="true"
                  >
                    {value ? this.formatPickedDate(pickedDate) : ''}
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
                ref={element => {
                  this.input = element;
                }}
                id={`${this.identifier}-${name}`}
                role="combobox"
                tabIndex="0"
                className="Select-input"
                aria-controls=""
                aria-expanded={isOpen}
                aria-owns=""
                aria-activedescendant=""
                aria-readonly="false"
                onFocus={() => {
                  this.updateState(undefined, true);
                }}
                onBlur={() => {
                  form.setFieldTouched(name, true);
                }}
                style={{ border: '0px', width: '1px', display: 'inline-block' }}
              />
            </span>
          </div>
          {isOpen && (
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
                  form.setFieldError(name, null);

                  // set value
                  form.setFieldValue(name, day.toString());
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
}

FormDatePicker.propTypes = propTypes;
FormDatePicker.defaultProps = defaultProps;

export default withFormField(FormDatePicker);
