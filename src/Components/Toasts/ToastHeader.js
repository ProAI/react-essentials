import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseView } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function ToastHeader({ children, ...elementProps }) {
  const classes = cx(
    // constant classes
    'toast-header',
  );

  return (
    <BaseView props={elementProps} className={classes}>
      {children}
    </BaseView>
  );
}

ToastHeader.propTypes = propTypes;

export default ToastHeader;
