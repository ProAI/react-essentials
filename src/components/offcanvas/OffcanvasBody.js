import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const OffcanvasBody = React.forwardRef((props, ref) => (
  <BaseView {...props} ref={ref} essentials={{ className: 'offcanvas-body' }} />
));

OffcanvasBody.displayName = 'OffcanvasBody';
OffcanvasBody.propTypes = propTypes;

export default OffcanvasBody;
