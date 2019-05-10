import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';
import setRef from '../../utils/setRef';

const propTypes = {
  children: PropTypes.node.isRequired,
  titleId: PropTypes.string,
};

const defaultProps = {
  titleId: null,
};

const ModalTitle = React.forwardRef(function ModalTitle(props, ref) {
  const { titleId, ...elementProps } = props;

  const title = useRef();

  useEffect(() => {
    title.current.setNativeProps({ id: titleId });
  }, [titleId]);

  return (
    <BaseView
      {...elementProps}
      ref={value => {
        title.current = value;
        setRef(ref, value);
      }}
      accessibilityRole="heading"
      aria-level={5}
      essentials={{ className: 'modal-title' }}
    />
  );
});

ModalTitle.propTypes = propTypes;
ModalTitle.defaultProps = defaultProps;

export default ModalTitle;
