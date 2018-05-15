import React from 'react';
import PropTypes from 'prop-types';
import AppContainer from 'react-native-web/dist/exports/AppRegistry/AppContainer';
import { contextTypes } from './utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  root: PropTypes.any,
  ssrViewport: PropTypes.string,
  breakpoints: PropTypes.shape({
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number,
  }).isRequired,
};

const defaultProps = {
  root: {},
  ssrViewport: null,
};

const childContextTypes = contextTypes;

class Provider extends React.Component {
  state = {
    count: 0,
  };

  getChildContext() {
    return {
      essentials: {
        ssrViewport: this.props.ssrViewport,
        breakpoints: this.props.breakpoints,
        generateKey: this.generateKey,
      },
    };
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
