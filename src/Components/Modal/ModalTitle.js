import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';
import { formatChildren } from '../../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  titleId: PropTypes.string,
  raw: PropTypes.bool,
};

const defaultProps = {
  titleId: null,
  raw: false,
};

function ModalTitle({
  children, titleId, raw, ...elementProps
}) {
  return (
    <BaseView tag="h5" props={elementProps} className="modal-title" id={titleId}>
      {formatChildren(children, raw)}
    </BaseView>
  );
}

ModalTitle.propTypes = propTypes;
ModalTitle.defaultProps = defaultProps;

export default ModalTitle;
