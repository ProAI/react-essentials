import React from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'react-native-web/dist/cjs/exports/Dimensions';
import { contextTypes } from '../../utils';

const propTypes = {
  children: PropTypes.func.isRequired,
};

class Viewport extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      viewport: context.essentials.ssrViewport,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { state } = this;

    Dimensions.addEventListener('change', this.handleChange);

    const viewport = this.calculateViewport(Dimensions.get('window').width);

    // check if server guess for viewport was right
    if (state.viewport !== viewport) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ viewport });
    }
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.handleChange);
  }

  calculateViewport(width) {
    const {
      essentials: { breakpoints },
    } = this.context;

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
  }

  handleChange(dimensions) {
    const { state } = this;
    const viewport = this.calculateViewport(dimensions.window.width);

    if (state.viewport !== viewport) {
      this.setState({ viewport });
    }
  }

  render() {
    const { children: childrenFn } = this.props;
    const { viewport } = this.state;

    const xs = viewport === 'xs';
    const sm = viewport === 'sm';
    const md = viewport === 'md';
    const lg = viewport === 'lg';
    const xl = viewport === 'xl';

    const media = {
      isXs: xs,
      isSm: sm,
      isMd: md,
      isLg: lg,
      isXl: xl,
      isUpSm: !xs,
      isUpMd: !(xs || sm),
      isUpLg: lg || xl,
      isUpXl: xl,
      isDownXs: xs,
      isDownSm: xs || sm,
      isDownMd: !(lg || xl),
      isDownLg: !xl,
    };

    return childrenFn(media);
  }
}

Viewport.propTypes = propTypes;
Viewport.contextTypes = contextTypes;

export default Viewport;
