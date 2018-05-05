import React from 'react';
import { BaseView } from '../../utils/components';
import GridBox from './GridBox';

function Grid({ ...otherProps }) {
  return <BaseView {...otherProps} className="row" />;
}

Grid.Box = GridBox;

export default Grid;
