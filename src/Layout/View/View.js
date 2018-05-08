import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function View({ children, ...elementProps }) {
  return (
    <BaseView props={elementProps} className="">
      {children}
    </BaseView>
  );
}

View.propTypes = propTypes;

export default View;
