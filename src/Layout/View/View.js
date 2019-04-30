import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';
import { PAGE_SECTIONS } from '../../utils/constants';

const propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(PAGE_SECTIONS),
};

const defaultProps = {
  children: null,
  variant: null,
};

function View({ variant, ...elementProps }) {
  return <BaseView {...elementProps} essentials={{ tag: variant || 'div' }} />;
}

View.propTypes = propTypes;
View.defaultProps = defaultProps;

export default View;
