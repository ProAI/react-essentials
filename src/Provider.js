import React from 'react';
import PropTypes from 'prop-types';
import AppContainer from 'react-native-web/dist/exports/AppRegistry/AppContainer';

const propTypes = {
  children: PropTypes.node.isRequired,
  root: PropTypes.any,
};

const defaultProps = {
  root: {},
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
    const { children, root } = this.props;

    return <AppContainer rootTag={root}>{children}</AppContainer>;
  }
}

Provider.propTypes = propTypes;
Provider.defaultProps = defaultProps;
Provider.childContextTypes = childContextTypes;

export default Provider;
