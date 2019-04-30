import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseView from '../../utils/rnw-compat/BaseView';
import { GRID_SIZES, PAGE_SECTIONS } from '../../utils/constants';

const propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(PAGE_SECTIONS),
  size: PropTypes.oneOf(GRID_SIZES).isRequired,
  sizeSm: PropTypes.oneOf(GRID_SIZES),
  sizeMd: PropTypes.oneOf(GRID_SIZES),
  sizeLg: PropTypes.oneOf(GRID_SIZES),
  sizeXl: PropTypes.oneOf(GRID_SIZES),
};

const defaultProps = {
  variant: null,
  sizeSm: null,
  sizeMd: null,
  sizeLg: null,
  sizeXl: null,
};

function GridBox({
  children,
  variant,
  size,
  sizeSm,
  sizeMd,
  sizeLg,
  sizeXl,
  ...elementProps
}) {
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
    <BaseView {...elementProps} essentials={{ className: classes }}>
      {children}
    </BaseView>
  );
}

GridBox.propTypes = propTypes;
GridBox.defaultProps = defaultProps;

export default GridBox;
