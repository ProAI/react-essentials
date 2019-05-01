import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: null,
};

function View(elementProps) {
  return <BaseView {...elementProps} essentials={{}} />;
}

View.propTypes = propTypes;
View.defaultProps = defaultProps;

export default View;
