import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import invariant from 'fbjs/lib/invariant';
import TabContext from './TabContext';
import BaseView from '../../utils/rnw-compat/BaseView';
import getElementId from '../../utils/getElementId';

const propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
};

const TabPane = React.forwardRef((props, ref) => {
  const { id: target, ...elementProps } = props;

  const tabbable = useContext(TabContext);

  invariant(
    tabbable,
    'TabPane can only be used inside a TabProvider component.',
  );

  const classes = cx(
    // constant classes
    'tab-pane',
    // variable classes
    tabbable.activeTarget === target && 'active show',
  );

  const id = getElementId(tabbable.identifier, target);

  return (
    <BaseView
      {...elementProps}
      ref={ref}
      nativeID={id}
      accessibiltyRole="tabpanel"
      aria-labelledby={`${id}-tab`}
      essentials={{ className: classes }}
    />
  );
});

TabPane.displayName = 'TabPane';
TabPane.propTypes = propTypes;

export default TabPane;
