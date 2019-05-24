import React from 'react';
import PropTypes from 'prop-types';
import AppContainer from 'react-native-web/dist/cjs/exports/AppRegistry/AppContainer';
import Dimensions from 'react-native-web/dist/cjs/exports/Dimensions';
import Context from './Context';

const calculateViewport = (width, breakpoints) => {
  if (width < breakpoints.sm) {
    return 'xs';
  }
  if (width < breakpoints.md) {
    return 'sm';
  }
  if (width < breakpoints.lg) {
    return 'md';
  }
  if (width < breakpoints.xl) {
    return 'lg';
  }
  return 'xl';
};

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

class Provider extends React.Component {
  key = 0;

  constructor(props) {
    super(props);

    this.state = {
      viewport: props.ssrViewport,
    };

    this.getContext = this.getContext.bind(this);
    this.generateKey = this.generateKey.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.handleChange({ window: Dimensions.get('window') });

    Dimensions.addEventListener('change', this.handleChange);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.handleChange);
  }

  getContext() {
    const { breakpoints } = this.props;
    const { viewport } = this.state;

    return {
      breakpoints,
      viewport,
      generateKey: this.generateKey,
    };
  }

  handleChange(dimensions) {
    const { breakpoints } = this.props;
    const { viewport } = this.state;

    const nextViewport = calculateViewport(
      dimensions.window.width,
      breakpoints,
    );

    if (viewport !== nextViewport) {
      this.setState({ viewport: nextViewport });
    }
  }

  generateKey(prefix) {
    const { key } = this;

    this.key = key + 1;

    return `${prefix}${key}`;
  }

  render() {
    const { children, root } = this.props;

    return (
      <Context.Provider value={this.getContext()}>
        <AppContainer rootTag={root}>{children}</AppContainer>
      </Context.Provider>
    );
  }
}

Provider.propTypes = propTypes;
Provider.defaultProps = defaultProps;

export default Provider;
