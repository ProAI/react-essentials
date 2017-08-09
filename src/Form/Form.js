import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Field } from 'redux-form';
import FormText from './FormText';
import FormInput from './FormInput';
import FormPicker from './FormPicker';
import FormDatePicker from './FormDatePicker';
import FormChoice from './FormChoice';
import FormCheckbox from './FormCheckbox';

const propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  className: null,
};

class Form extends React.Component {
  static Text = FormText;
  static Input = props => <Field component={FormInput} {...props} />;
  static Picker = props => <Field component={FormPicker} {...props} />;
  static DatePicker = props => <Field component={FormDatePicker} {...props} />;
  static Choice = props => <Field component={FormChoice} {...props} />;
  static Checkbox = props => <Field component={FormCheckbox} {...props} />;

  render() {
    const { children, className, ...attributes } = this.props;

    const classes = cx('form', className);

    return (
      <form {...attributes} className={classes}>
        {children}
      </form>
    );
  }
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

export default Form;
