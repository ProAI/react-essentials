import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContainer from 'react-native-web/dist/cjs/exports/AppRegistry/AppContainer';
import Dimensions from 'react-native-web/dist/cjs/exports/Dimensions';
import Context from './Context';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  rootTag: PropTypes.any,
  ssrViewport: PropTypes.string,
  breakpoints: PropTypes.shape({
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number,
  }).isRequired,
};

const useViewport = ({ initialViewport, breakpoints }) => {
  const [viewport, setViewport] = useState(initialViewport);

  useEffect(() => {
    const calculateViewport = width => {
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

    const handleChange = dimensions => {
      const nextViewport = calculateViewport(dimensions.window.width);

      if (viewport !== nextViewport) {
        setViewport(nextViewport);
      }
    };

    // Initially determine viewport after mounting.
    handleChange({ window: Dimensions.get('window') });

    Dimensions.addEventListener('change', handleChange);

    return () => {
      Dimensions.removeEventListener('change', handleChange);
    };
  }, []);
};

function Provider(props) {
  const { children, rootTag = {}, ssrViewport, breakpoints } = props;

  const viewport = useViewport({ initialViewport: ssrViewport, breakpoints });

  const counter = useRef(0);

  const context = {
    getBreakpoints() {
      return breakpoints;
    },
    getViewport() {
      return viewport;
    },
    generateKey(prefix) {
      counter.current += 1;

      return `ui-${prefix}-${counter.current}`;
    },
  };

  return (
    <Context.Provider value={context}>
      <AppContainer rootTag={rootTag}>{children}</AppContainer>
    </Context.Provider>
  );
}

Provider.propTypes = propTypes;

export default Provider;
