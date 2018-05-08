import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const childContextTypes = {
  generateKey: PropTypes.func.isRequired,
};

class Provider extends React.Component {
  state = {
    count: 0,
  };

  getChildContext() {
    return { generateKey: this.generateKey };
  }

  generateKey(prefix) {
    const key = `${prefix}${this.state.count}`;

    this.setState(({ count }) => ({ count: count + 1 }));

    return key;
  }

  render() {
    return this.props.children;
  }
}

Provider.propTypes = propTypes;
Provider.childContextTypes = childContextTypes;

export default Provider;
