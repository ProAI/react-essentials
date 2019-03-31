import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseView } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function ToastBody({ children, ...elementProps }) {
  const classes = cx(
    // constant classes
    'toast-body',
  );

  return (
    <BaseView props={elementProps} className={classes}>
      {children}
    </BaseView>
  );
}

ToastBody.propTypes = propTypes;

export default ToastBody;
