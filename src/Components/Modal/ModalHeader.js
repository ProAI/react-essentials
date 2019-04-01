import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
  titleId: PropTypes.string,
  onToggle: PropTypes.func,
};

const defaultProps = {
  titleId: null,
  onToggle: null,
};

function ModalHeader({ children, titleId, onToggle, ...elementProps }) {
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
    </BaseView>
  );
}

ModalHeader.propTypes = propTypes;
ModalHeader.defaultProps = defaultProps;

export default ModalHeader;
