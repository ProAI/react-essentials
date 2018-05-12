import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';
import { PAGE_SECTIONS } from '../../utils/constants';

const propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(PAGE_SECTIONS),
};

const defaultProps = {
  variant: null,
};

function View({ children, variant, ...elementProps }) {
  return (
    <BaseView tag={variant || 'div'} props={elementProps} className="">
      {children}
    </BaseView>
  );
}

View.propTypes = propTypes;
View.defaultProps = defaultProps;

export default View;
