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

const Grid = React.forwardRef(function Grid(props, ref) {
  const { noGutters, ...elementProps } = props;

  const classes = cx(
    // constant classes
    'row',
    'flex-row',
    // variable classes
    noGutters && 'no-gutters',
  );

  return (
    <BaseView {...elementProps} ref={ref} essentials={{ className: classes }} />
  );
});

Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;

Grid.Box = GridBox;

export default Grid;
