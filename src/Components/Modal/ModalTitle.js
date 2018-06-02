import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
  titleId: PropTypes.string,
};

const defaultProps = {
  titleId: null,
};

function ModalTitle({ children, titleId, ...elementProps }) {
  return (
    <BaseView
      tag="h5"
      props={{ id: titleId, ...elementProps }}
      className="modal-title"
      id={titleId}
    >
      {children}
    </BaseView>
  );
}

ModalTitle.propTypes = propTypes;
ModalTitle.defaultProps = defaultProps;

export default ModalTitle;
