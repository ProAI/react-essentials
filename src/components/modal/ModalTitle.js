import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';
import setRef from '../../utils/setRef';

const propTypes = {
  children: PropTypes.node.isRequired,
  titleId: PropTypes.string,
};

const ModalTitle = React.forwardRef((props, ref) => {
  const { titleId, ...elementProps } = props;

  const title = useRef();

  useEffect(() => {
    title.current.setNativeProps({ id: titleId });
  }, [titleId]);

  return (
    <BaseView
      {...elementProps}
      ref={(element) => {
        title.current = element;
        setRef(ref, element);
      }}
      accessibilityRole="heading"
      aria-level={5}
      essentials={{ className: 'modal-title' }}
    />
  );
});

ModalTitle.displayName = 'ModalTitle';
ModalTitle.propTypes = propTypes;

export default ModalTitle;
