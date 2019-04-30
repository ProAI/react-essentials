import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseView from '../../utils/rnw-compat/BaseView';
import GridBox from './GridBox';

const propTypes = {
  children: PropTypes.node.isRequired,
  noGutters: PropTypes.bool,
};

const defaultProps = {
  noGutters: false,
};

function Grid({ noGutters, ...elementProps }) {
  const classes = cx(
    // constant classes
    'row',
    'flex-row',
    // variable classes
    noGutters && 'no-gutters',
  );

  return <BaseView {...elementProps} essentials={{ className: classes }} />;
}

Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;

Grid.Box = GridBox;

export default Grid;
