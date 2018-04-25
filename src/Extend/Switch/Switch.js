/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';
import { generateKey } from '../../utils';

const propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  variant: PropTypes.oneOf(['blank', 'symbols', 'onoff', 'yesno']),
};

const defaultProps = {
  checked: null,
  onChange: null,
  variant: 'blank',
};

class SwitchButton extends React.Component {
  state = {
    checked: false,
  };

  onChange = (event) => {
    const nextCheckedState = !this.isChecked();

    if (this.props.onChange !== null) {
      this.props.onChange(nextCheckedState, event);
    }

    // automatically check/uncheck switch
    if (this.props.checked === null) {
      this.setState({
        checked: nextCheckedState,
      });
    }
  };

  onLabelMouseUp = () => {
    // We don't want to show the focus style if the switch was focused by a
    // mouse click. So we will blur the component on mouse up. Since a later
    // rerendering will focus the component again, we have to do this with a
    // tiny delay asynchronously. This seems to be hacky, but since this is
    // only a ui concern it should be okay.
    setTimeout(() => {
      this.element.blur();
    }, 10);
  };

  identifier = generateKey('re-switch-');

  isChecked = () => {
    if (this.props.checked !== null) {
      return this.props.checked;
    }

    return this.state.checked;
  };

  render() {
    const { variant } = this.props;

    return (
      <div className="switch">
        <label className="switch-control" htmlFor={this.identifier} onMouseUp={this.onLabelMouseUp}>
          <input
            ref={(ref) => {
              this.element = ref;
            }}
            name="switch"
            id={this.identifier}
            type="checkbox"
            className="switch-control-input"
            checked={this.isChecked()}
            onChange={this.onChange}
          />
          <div className="switch-control-indicator">
            <span className={`switch-control-indicator-label switch-${variant}`} />
            <span className="switch-control-indicator-checker" />
          </div>
        </label>
      </div>
    );
  }
}

SwitchButton.propTypes = propTypes;
SwitchButton.defaultProps = defaultProps;

export default SwitchButton;
