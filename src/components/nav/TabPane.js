import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import invariant from 'fbjs/lib/invariant';
import TabContext from './TabContext';
import BaseView from '../../utils/rnw-compat/BaseView';
import useTarget from '../../hooks/useTarget';
import concatClasses from '../../utils/concatClasses';
import concatProps from '../../utils/concatProps';

const propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
};

const TabPane = React.forwardRef((props, ref) => {
  const { id, ...elementProps } = props;

  const target = useTarget(TabContext, id);

  invariant(target, 'TabPane can only be used inside a TabProvider component.');

  const classes = cx(
    // constant classes
    'tab-pane',
    // variable classes
    concatClasses(target),
  );

  return (
    <BaseView
      {...concatProps({ ...elementProps, ref }, target)}
      essentials={{ className: classes }}
    />
  );
});

TabPane.displayName = 'TabPane';
TabPane.propTypes = propTypes;

export default TabPane;
