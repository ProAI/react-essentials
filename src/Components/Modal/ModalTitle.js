import React from 'react';
import PropTypes from 'prop-types';
import { BaseView, BaseText } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
  titleId: PropTypes.string,
};

const defaultProps = {
  titleId: null,
};

function ModalTitle({ children, titleId, ...elementProps }) {
  return (
    <BaseView tag="h5" props={elementProps} className="modal-title" id={titleId}>
      <BaseText className="" blockOnly>
        {children}
      </BaseText>
    </BaseView>
  );
}

ModalTitle.propTypes = propTypes;
ModalTitle.defaultProps = defaultProps;

export default ModalTitle;
