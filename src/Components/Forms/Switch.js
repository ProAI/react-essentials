import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseView } from '../../utils/components';
import { contextTypes as essentialsContextTypes } from '../../utils';

const propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

const contextTypes = {
  ...essentialsContextTypes,
};

const defaultProps = {
  disabled: false,
};

class Switch extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.identifier = context.essentials.generateKey('re-switch-');
  }

  render() {
    const { label, checked, onChange, disabled, ...elementProps } = this.props;
    const classes = cx(
      // constant classes
      'custom-control',
      'custom-switch',
    );

    /* eslint-disable jsx-a11y/label-has-for */
    return (
      <BaseView props={elementProps} role="alert" className={classes}>
        <input
          type="checkbox"
          className="custom-control-input"
          checked={checked}
          onChange={event => {
            onChange(!checked, event);
          }}
          disabled={disabled}
          id={`${this.identifier}`}
        />
        <label className="custom-control-label" htmlFor={`${this.identifier}`}>
          {label}
        </label>
      </BaseView>
    );
    /* eslint-enable */
  }
}

Switch.propTypes = propTypes;
Switch.contextTypes = contextTypes;
Switch.defaultProps = defaultProps;

export default Switch;
