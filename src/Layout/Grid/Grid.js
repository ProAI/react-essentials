import React from 'react';
import { BaseView } from '../../utils/components';
import GridBox from './GridBox';

function Grid({ ...elementProps }) {
  return <BaseView elementProps={elementProps} className="row" />;
}

Grid.Box = GridBox;

export default Grid;
