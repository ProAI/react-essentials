import React, { Component, PropTypes } from 'react';
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

class Form extends Component {
  getChildContext() {
    return {
      form: this.props.name,
    };
  }

  render() {
    const { children, onSubmit, className, ...attributes } = this.props;

    const classes = cx(
      'form',
      className,
    );

    return (
      <form {...attributes} onSubmit={onSubmit} className={classes}>
        {children}
      </form>
    );
  }
}

Form.propTypes = propTypes;
Form.childContextTypes = childContextTypes;

export default Form;
