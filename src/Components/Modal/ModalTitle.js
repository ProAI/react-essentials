import React from 'react';
import PropTypes from 'prop-types';
import { BaseText } from '../../utils/components';

const propTypes = {
  titleId: PropTypes.string,
};

const defaultProps = {
  titleId: null,
};

function ModalTitle({ titleId, ...otherProps }) {
  return <BaseText {...otherProps} tag="h5" className="modal-title" id={titleId} />;
}

ModalTitle.propTypes = propTypes;
ModalTitle.defaultProps = defaultProps;

export default ModalTitle;
