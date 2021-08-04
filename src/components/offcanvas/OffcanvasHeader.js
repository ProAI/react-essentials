import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
  titleId: PropTypes.string,
};

const OffcanvasHeader = React.forwardRef((props, ref) => (
  <BaseView
    {...props}
    ref={ref}
    essentials={{ className: 'offcanvas-header' }}
  />
));

OffcanvasHeader.displayName = 'OffcanvasHeader';
OffcanvasHeader.propTypes = propTypes;

export default OffcanvasHeader;
