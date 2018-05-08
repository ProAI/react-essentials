import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseView } from '../../utils/components';
import { GRID_SIZES } from '../../utils/constants';

const propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(GRID_SIZES).isRequired,
  sizeSm: PropTypes.oneOf(GRID_SIZES),
  sizeMd: PropTypes.oneOf(GRID_SIZES),
  sizeLg: PropTypes.oneOf(GRID_SIZES),
  sizeXl: PropTypes.oneOf(GRID_SIZES),
};

const defaultProps = {
  sizeSm: null,
  sizeMd: null,
  sizeLg: null,
  sizeXl: null,
};

function GridBox({
  children, size, sizeSm, sizeMd, sizeLg, sizeXl, ...elementProps
}) {
  const classes = cx(
    // constant classes
    `col-${size.toString()}`,
    // variable classes
    sizeSm && `col-sm-${sizeSm.toString()}`,
    sizeMd && `col-sm-${sizeMd.toString()}`,
    sizeLg && `col-sm-${sizeLg.toString()}`,
    sizeXl && `col-sm-${sizeXl.toString()}`,
  );

  return (
    <BaseView props={elementProps} className={classes}>
      {children}
    </BaseView>
  );
}

GridBox.propTypes = propTypes;
GridBox.defaultProps = defaultProps;

export default GridBox;
