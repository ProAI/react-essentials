import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
  titleId: PropTypes.string,
};

const defaultProps = {
  titleId: null,
};

function ModalTitle(props) {
  const { titleId, ...elementProps } = props;

  const title = useRef();

  useEffect(() => {
    title.current.setNativeProps({ id: titleId });
  }, [titleId]);

  return (
    <BaseView
      {...elementProps}
      accessibilityRole="heading"
      aria-level={5}
      ref={title}
      essentials={{ className: 'modal-title' }}
    />
  );
}

ModalTitle.propTypes = propTypes;
ModalTitle.defaultProps = defaultProps;

export default ModalTitle;
