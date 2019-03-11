import React from 'react';
import PropTypes from 'prop-types';
import AppContainer from 'react-native-web/dist/cjs/exports/AppRegistry/AppContainer';
import Alert from './Components/Alerts/Alert';
import { contextTypes } from './utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
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
  key = 0;

  constructor(props, context) {
    super(props, context);

    this.generateKey = this.generateKey.bind(this);
  }

  getChildContext() {
    const { ssrViewport, breakpoints } = this.props;

    return {
      essentials: {
        ssrViewport,
        breakpoints,
        generateKey: this.generateKey,
      },
    };
  }

  generateKey(prefix) {
    const { key } = this;

    this.key = key + 1;

    return `${prefix}${key}`;
  }

  render() {
    const { children, root } = this.props;

    return (
      <React.Fragment>
        <AppContainer rootTag={root}>{children}</AppContainer>
        <Alert.Container />
      </React.Fragment>
    );
  }
}

Provider.propTypes = propTypes;
Provider.defaultProps = defaultProps;
Provider.childContextTypes = childContextTypes;

export default Provider;
