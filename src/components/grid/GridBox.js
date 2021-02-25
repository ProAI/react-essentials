import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseView from '../../utils/rnw-compat/BaseView';
import { GRID_SIZES } from '../../utils/constants';

const propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(GRID_SIZES).isRequired,
  sizeSm: PropTypes.oneOf(GRID_SIZES),
  sizeMd: PropTypes.oneOf(GRID_SIZES),
  sizeLg: PropTypes.oneOf(GRID_SIZES),
  sizeXl: PropTypes.oneOf(GRID_SIZES),
};

const GridBox = React.forwardRef((props, ref) => {
  const {
    children,
    size,
    sizeSm,
    sizeMd,
    sizeLg,
    sizeXl,
    ...elementProps
  } = props;

  const classes = cx(
    // constant classes
    `col-${size.toString()}`,
    // variable classes
    sizeSm && `col-sm-${sizeSm.toString()}`,
    sizeMd && `col-md-${sizeMd.toString()}`,
    sizeLg && `col-lg-${sizeLg.toString()}`,
    sizeXl && `col-xl-${sizeXl.toString()}`,
  );

  return (
    <BaseView {...elementProps} ref={ref} essentials={{ className: classes }}>
      {children}
    </BaseView>
  );
});

GridBox.displayName = 'GridBox';
GridBox.propTypes = propTypes;

export default GridBox;
