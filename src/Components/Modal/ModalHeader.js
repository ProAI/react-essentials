import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';
import { CloseButton } from '../../utils';

const propTypes = {
  titleId: PropTypes.string,
  children: PropTypes.node.isRequired,
  onToggle: PropTypes.func.isRequired,
  dismissible: PropTypes.bool.isRequired,
};

const defaultProps = {
  titleId: null,
};

function ModalHeader({
  titleId, children, dismissible, onToggle, ...elementProps
}) {
  // inject titleId
  const manipulatedChildren = React.Children.map(children, child =>
    React.cloneElement(child, {
      titleId: this.identifier,
    }));

  return (
    <BaseView elementProps={elementProps} className="modal-header">
      {manipulatedChildren}
      {dismissible && <CloseButton onClick={onToggle} />}
    </BaseView>
  );
}

ModalHeader.propTypes = propTypes;
ModalHeader.defaultProps = defaultProps;

export default ModalHeader;
