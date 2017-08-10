/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/role-has-required-aria-props */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import DayPicker from 'react-day-picker/DayPicker';
import Field from './Field';

const propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  info: PropTypes.string,
  size: PropTypes.oneOf(['sm']),
  // redux form props
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

const defaultProps = {
  label: null,
  placeholder: null,
  info: null,
  size: null,
};

class FormDatePicker extends React.Component {
  state = {
    isOpen: false,
  };

  componentWillReceiveProps(nextProps) {
    // if datepicker is not focused, close dropdown
    if (!nextProps.meta.active && this.state.isOpen) {
      this.toggle();
    }
  }

  componentDidUpdate() {
    // if field is active, set focus on tabIndex element
    if (this.props.meta.active) {
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

  onToggleMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();

    // if datepicker is not focused, focus datepicker
    if (!this.props.meta.active) {
      this.props.input.onFocus();
    }

    // open/close dropdown
    this.toggle();
  };

  onToggleKeyDown = (event) => {
    if (!this.state.isOpen && event.key === 'ArrowDown') {
      this.onToggleMouseDown(event);
    }
  };

  onMenuMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  onInputKeyDown = (event) => {
    if (this.state.isOpen && event.key === 'Escape') {
      this.toggle();
    }
  };

  onDayClick = (day) => {
    // close dropdown
    this.toggle();

    // set value
    this.props.input.onChange(day);
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { label, placeholder, info, size, input, meta } = this.props;
    const labelClasses = cx('form-control-label', { active: meta.active });
    const classes = cx('form-datepicker Select Select--single', {
      'form-datepicker-danger': meta.error,
      'form-datepicker-sm': size === 'sm',
      'has-value': input.value,
      'is-focused': meta.active,
      'is-open': this.state.isOpen,
    });
    const controlClasses = cx('form-datepicker-control Select-control');
    const menuClasses = cx('form-datepicker-menu');

    const pickedDate = input.value ? new Date(input.value) : new Date();
    const initialMonth = new Date(pickedDate.getFullYear(), pickedDate.getMonth());

    return (
      <Field meta={meta} info={info}>
        {label &&
          <label htmlFor={`${meta.form}-${input.name}`} className={labelClasses}>
            {label}
          </label>}
        <div className={classes}>
          <div
            className={controlClasses}
            onMouseDown={this.onToggleMouseDown}
            onKeyDown={this.onToggleKeyDown}
          >
            <span className="Select-multi-value-wrapper">
              {!input.value &&
                <div className="Select-placeholder">
                  {placeholder}
                </div>}
              {input.value &&
                <div className="Select-value">
                  <span className="Select-value-label" role="option" aria-selected="true">
                    {input.value ? pickedDate.toLocaleDateString('en') : ''}
                  </span>
                </div>}
              {/* TODO
                * aria-owns should be the id of the date list element
                * aria-activedescendant should be the id of the currently selected day element
                * aria-readonly should be true if datepicker is disabled

                * see react-select for an example
              */}
              <div
                {...input}
                ref={(element) => {
                  this.input = element;
                }}
                id={`${meta.form}-${input.name}`}
                role="combobox"
                tabIndex="0"
                className="Select-input"
                aria-expanded={this.state.isOpen}
                aria-owns=""
                aria-activedescendant=""
                aria-readonly="false"
                onBlur={() => {
                  input.onBlur(input.value);
                }}
                onKeyDown={this.onInputKeyDown}
                style={{ border: '0px', width: '1px', display: 'inline-block' }}
              />
            </span>
          </div>
          {this.state.isOpen &&
            <div
              ref={(menu) => {
                this.menu = menu;
              }}
              className={menuClasses}
              onMouseDown={this.onMenuMouseDown}
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
            </div>}
        </div>
      </Field>
    );
  }
}

FormDatePicker.propTypes = propTypes;
FormDatePicker.defaultProps = defaultProps;

export default FormDatePicker;
