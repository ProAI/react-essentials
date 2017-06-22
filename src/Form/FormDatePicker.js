import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import DayPicker from 'react-day-picker/DayPicker';
import Field from './Field';
import Dropdown from '../Dropdown/Dropdown';
import injectDropdownToggle from '../Dropdown/injectDropdownToggle';

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
    extended: false,
  };

  onInputFocus = () => {
    this.setState({
      extended: true,
    });
  };

  onInputBlur = () => {
    this.setState({
      extended: false,
    });
  };

  render() {
    const { label, placeholder, info, size, input, meta } = this.props;

    const labelClasses = cx('form-control-label', { active: meta.active });

    const classes = cx('form-control custom-datepicker', {
      'form-control-danger': meta.error,
      'form-control-sm': size === 'sm',
    });

    const menuClasses = cx('custom-datepicker-menu');

    const InputToggleDropdown = injectDropdownToggle('input');

    return (
      <Field meta={meta} info={info}>
        {label &&
          <label htmlFor={`${meta.form}-${input.name}`} className={labelClasses}>{label}</label>}
        <Dropdown>
          <InputToggleDropdown
            {...input}
            id={`${meta.form}-${input.name}`}
            placeholder={placeholder}
            type="text"
            className={classes}
          />
          <Dropdown.Menu className={menuClasses}>
            <DayPicker onDayClick={day => console.log(day)} />
          </Dropdown.Menu>
        </Dropdown>
      </Field>
    );
  }
}

FormDatePicker.propTypes = propTypes;
FormDatePicker.defaultProps = defaultProps;

export default FormDatePicker;
