import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';
import GridBox from './GridBox';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function Grid({ children, ...elementProps }) {
  return (
    <BaseView props={elementProps} className="row flex-row">
      {children}
    </BaseView>
  );
}

Grid.propTypes = propTypes;

Grid.Box = GridBox;

export default Grid;
