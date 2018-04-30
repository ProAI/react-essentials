import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { GRID_SIZES, UTILS } from '../../utils/propTypes';

const propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(GRID_SIZES).isRequired,
  sizeSm: PropTypes.oneOf(GRID_SIZES),
  sizeMd: PropTypes.oneOf(GRID_SIZES),
  sizeLg: PropTypes.oneOf(GRID_SIZES),
  sizeXl: PropTypes.oneOf(GRID_SIZES),
  class: PropTypes.arrayOf(UTILS),
  style: PropTypes.object,
};

const defaultProps = {
  sizeSm: null,
  sizeMd: null,
  sizeLg: null,
  sizeXl: null,
  class: null,
  style: null,
};

function GridBox({
  children, size, sizeSm, sizeMd, sizeLg, sizeXl, class: utils, style,
}) {
  const classes = cx(
    // base classes
    `col-${size.toString()}`,
    // variable classes
    sizeSm ? `col-sm-${sizeSm.toString()}` : null,
    sizeMd ? `col-sm-${sizeMd.toString()}` : null,
    sizeLg ? `col-sm-${sizeLg.toString()}` : null,
    sizeXl ? `col-sm-${sizeXl.toString()}` : null,
    // util classes
    utils.join(' '),
  );

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}

GridBox.propTypes = propTypes;
GridBox.defaultProps = defaultProps;

export default GridBox;
