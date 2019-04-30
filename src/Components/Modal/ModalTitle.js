import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
  titleId: PropTypes.string,
};

const defaultProps = {
  titleId: null,
};

function ModalTitle({ titleId, ...elementProps }) {
  return (
    <BaseView
      {...elementProps}
      id={titleId}
      essentials={{ tag: 'h5', className: 'modal-title' }}
    />
  );
}

ModalTitle.propTypes = propTypes;
ModalTitle.defaultProps = defaultProps;

export default ModalTitle;
