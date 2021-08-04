import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import invariant from 'fbjs/lib/invariant';
import BaseView from '../../utils/rnw-compat/BaseView';
import OffcanvasContext from './OffcanvasContext';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const OffcanvasTitle = React.forwardRef((props, ref) => {
  const offcanvas = useContext(OffcanvasContext);

  invariant(
    offcanvas,
    'OffcanvasTitle can only be used inside an Offcanvas component.',
  );

  return (
    <BaseView
      {...props}
      ref={ref}
      nativeID={offcanvas.identifier}
      accessibilityRole="heading"
      aria-level={5}
      essentials={{ className: 'offcanvas-title' }}
    />
  );
});

OffcanvasTitle.displayName = 'OffcanvasTitle';
OffcanvasTitle.propTypes = propTypes;

export default OffcanvasTitle;
