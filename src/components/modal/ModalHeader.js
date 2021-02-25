import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
  titleId: PropTypes.string,
};

const ModalHeader = React.forwardRef((props, ref) => {
  const { children, titleId, ...elementProps } = props;

  // inject titleId props for aria support
  const clonedChildren = React.Children.map(children, (child, i) => {
    if (i > 0) {
      return child;
    }

    return React.cloneElement(child, { titleId });
  });

  return (
    <BaseView
      {...elementProps}
      ref={ref}
      essentials={{ className: 'modal-header' }}
    >
      {clonedChildren}
    </BaseView>
  );
});

ModalHeader.displayName = 'ModalHeader';
ModalHeader.propTypes = propTypes;

export default ModalHeader;
