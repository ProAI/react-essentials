import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: null,
};

const View = React.forwardRef(function View(elementProps, ref) {
  return <BaseView {...elementProps} ref={ref} essentials={{}} />;
});

View.propTypes = propTypes;
View.defaultProps = defaultProps;

export default View;
