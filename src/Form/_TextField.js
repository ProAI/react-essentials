import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

const propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  info: PropTypes.string,
  className: PropTypes.string,
  multiLine: PropTypes.bool,
};

const defaultProps = {
  multiLine: false,
};

class TextField extends Component {
  state = {
    active: (this.props.value),
    hasError: (this.props.error),
    value: this.props.value,
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });

    const value = (this.props.value === undefined && !e.target.value)
      ? undefined
      : e.target.value;

    if ((!this.state.hasError && this.props.error && value === this.props.value)
      || (this.state.hasError && value !== this.props.value)
    ) {
      this.setState({
        hasError: !this.state.hasError,
      });
    }
  }

  toggle = (e) => {
    if (!e.target.value) {
      this.setState({
        active: !this.state.active,
      });
    }
  }

  render() {
    const { className, label, id, error, info, multiLine, ...attributes } = this.props;

    const fieldsetClasses = cx(
      'form-group',
      { 'has-danger': this.state.hasError },
    );

    const labelClasses = cx(
      { active: this.state.active },
    );

    const inputClasses = cx(
      className,
      'form-control',
      { 'form-control-danger': this.state.hasError },
    );

    const Tag = (multiLine) ? 'textarea' : 'input';

    return (
      <fieldset className={fieldsetClasses}>
        <label htmlFor={id} className={labelClasses}>{label}</label>
        <Tag
          {...attributes}
          className={inputClasses}
          id={id}
          value={this.state.value}
          onFocus={this.toggle}
          onBlur={this.toggle}
          onChange={this.onChange}
        />
        {this.state.hasError && (
          <small className="text-danger">
            {error}
          </small>
        )}
        {info && (
          <small className="text-muted">
            {info}
          </small>
        )}
      </fieldset>
    );
  }
}

TextField.propTypes = propTypes;
TextField.defaultProps = defaultProps;

export default TextField;
