import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
  titleId: PropTypes.string,
};

const ModalTitle = React.forwardRef((props, ref) => {
  const { titleId, ...elementProps } = props;

  return (
    <BaseView
      {...elementProps}
      nativeID={titleId}
      ref={ref}
      accessibilityRole="heading"
      aria-level={5}
      essentials={{ className: 'modal-title' }}
    />
  );
});

ModalTitle.displayName = 'ModalTitle';
ModalTitle.propTypes = propTypes;

export default ModalTitle;
