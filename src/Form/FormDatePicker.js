import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import DayPicker from 'react-day-picker/DayPicker';
import Dropdown from '../Dropdown/Dropdown';
import injectDropdownToggle from '../Dropdown/injectDropdownToggle';

const propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['sm']),
  // redux form props
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

const contextTypes = {
  form: PropTypes.string.isRequired,
};

const defaultProps = {
  label: null,
  placeholder: null,
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
    const { label, placeholder, size, input, meta } = this.props;
    const form = this.context.form;
    const fieldsetClasses = cx('form-group', { 'has-danger': meta.error });

    const labelClasses = cx('form-control-label', { active: meta.active });

    const classes = cx('form-control custom-datepicker', {
      'form-control-danger': meta.error,
      'form-control-sm': size === 'sm',
    });

    const menuClasses = cx('custom-datepicker-menu');

    const InputToggleDropdown = injectDropdownToggle('input');

    return (
      <fieldset className={fieldsetClasses}>
        {label && <label htmlFor={`${form}-${input.name}`} className={labelClasses}>{label}</label>}
        <Dropdown>
          <InputToggleDropdown
            {...input}
            id={`${form}-${input.name}`}
            placeholder={placeholder}
            type="text"
            className={classes}
          />
          <Dropdown.Menu className={menuClasses}>
            <DayPicker onDayClick={day => console.log(day)} />
          </Dropdown.Menu>
        </Dropdown>
        {meta.touched &&
          meta.error &&
          <small className="text-danger">
            {meta.error}
          </small>}
      </fieldset>
    );
  }
}

FormDatePicker.propTypes = propTypes;
FormDatePicker.contextTypes = contextTypes;
FormDatePicker.defaultProps = defaultProps;

export default FormDatePicker;
