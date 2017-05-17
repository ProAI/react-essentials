import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
};

const childContextTypes = {
  form: PropTypes.string.isRequired,
};

const defaultProps = {
  className: null,
};

class Form extends React.Component {
  getChildContext() {
    return {
      form: this.props.name,
    };
  }

  render() {
    const { children, onSubmit, className, ...attributes } = this.props;

    const classes = cx('form', className);

    return (
      <form {...attributes} onSubmit={onSubmit} className={classes}>
        {children}
      </form>
    );
  }
}

Form.propTypes = propTypes;
Form.childContextTypes = childContextTypes;
Form.defaultProps = defaultProps;

export default Form;
