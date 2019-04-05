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

function ModalHeader({ children, titleId, ...elementProps }) {
  // inject titleId props for aria support
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
