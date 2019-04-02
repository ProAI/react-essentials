import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseView } from '../../utils/components';
import GridBox from './GridBox';

const propTypes = {
  children: PropTypes.node.isRequired,
  noGutters: PropTypes.bool,
};

const defaultProps = {
  noGutters: false,
};

function Grid({ children, noGutters, ...elementProps }) {
  const classes = cx(
    // constant classes
    'row',
    'flex-row',
    // variable classes
    noGutters && 'no-gutters',
  );

  return (
    <BaseView props={elementProps} className={classes}>
      {children}
    </BaseView>
  );
}

Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;

Grid.Box = GridBox;

export default Grid;
