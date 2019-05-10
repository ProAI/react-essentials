import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Field from './Field';
import Context from '../../Context';
import withFormField from './withFormField';

const propTypes = {
  title: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.node,
    }),
  ).isRequired,
  info: PropTypes.string,
  multiple: PropTypes.bool,
  formatError: PropTypes.func,
  fieldRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /* eslint-disable react/forbid-prop-types */
  field: PropTypes.any.isRequired,
  form: PropTypes.any.isRequired,
  /* eslint-enable */
};

const defaultProps = {
  title: null,
  info: null,
  multiple: false,
  formatError: null,
  fieldRef: null,
};

class FormChoice extends React.Component {
  static contextType = Context;

  constructor(props, context) {
    super(props, context);

    this.identifier = context.generateKey('re-form-');
  }

  render() {
    const {
      title,
      options,
      info,
      multiple,
      formatError,
      fieldRef,
      field: { name, value },
      form,
    } = this.props;

    let index = 0;

    const getIndex = () => index;

    const increaseIndex = () => {
      index += 1;
    };

    const check = multiple ? 'checkbox' : 'radio';

    const classes = cx(
      // constant classes
      'custom-control',
      `custom-${check}`,
    );

    const inputClasses = cx(
      // constant classes
      'custom-control-input',
      // variable classes
      form.touched[name] && form.errors[name] && 'is-invalid',
    );

    const error = formatError
      ? formatError(form.errors[name])
      : form.errors[name];

    /* eslint-disable jsx-a11y/label-has-for */
    return (
      <Field error={error} touched={form.touched[name]} info={info}>
        {title && <legend className="form-group-legend">{title}</legend>}
        <div className="custom-controls-stacked">
          {options.map(option => (
            <div key={getIndex()} className={classes}>
              {!multiple && (
                <input
                  ref={fieldRef}
                  type="radio"
                  id={`${this.identifier}-${name}-${getIndex()}`}
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={event => {
                    form.setFieldError(name, null);

                    form.setFieldValue(
                      name,
                      event.target.checked ? option.value : value,
                    );
                  }}
                  onBlur={() => form.setFieldTouched(name, true)}
                  className={inputClasses}
                />
              )}
              {multiple && (
                <input
                  ref={fieldRef}
                  type="checkbox"
                  id={`${this.identifier}-${name}-${getIndex()}`}
                  name={`${name}[${getIndex()}]`}
                  value={option.value}
                  checked={value ? value.indexOf(option.value) !== -1 : false}
                  onChange={event => {
                    form.setFieldError(name, null);

                    const newValue = value ? [...value] : [];
                    if (event.target.checked) {
                      newValue.push(option.value);
                    } else {
                      newValue.splice(newValue.indexOf(option.value), 1);
                    }

                    form.setFieldValue(name, newValue);
                  }}
                  onBlur={() => form.setFieldTouched(name, true)}
                  className={inputClasses}
                />
              )}
              <label
                className="custom-control-label"
                htmlFor={`${this.identifier}-${name}-${getIndex()}`}
              >
                {option.label}
              </label>
              {increaseIndex()}
            </div>
          ))}
        </div>
      </Field>
    );
    /* eslint-enable */
  }
}

FormChoice.propTypes = propTypes;
FormChoice.defaultProps = defaultProps;

export default withFormField(FormChoice);
