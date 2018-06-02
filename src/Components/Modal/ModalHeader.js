import React from 'react';
import PropTypes from 'prop-types';
import { BaseView, CloseButton } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
  titleId: PropTypes.string,
  onToggle: PropTypes.func,
  dismissible: PropTypes.bool,
};

const defaultProps = {
  titleId: null,
  onToggle: null,
  dismissible: null,
};

function ModalHeader({
  children, titleId, dismissible, onToggle, ...elementProps
}) {
  // inject titleId
  const manipulatedChildren = React.Children.map(children, (child, i) => {
    if (i === 0) {
      return React.cloneElement(child, {
        titleId,
      });
    }

    return child;
  });

  return (
    <BaseView props={elementProps} className="modal-header">
      {manipulatedChildren}
      {dismissible && <CloseButton onClick={onToggle} />}
    </BaseView>
  );
}

ModalHeader.propTypes = propTypes;
ModalHeader.defaultProps = defaultProps;

export default ModalHeader;
