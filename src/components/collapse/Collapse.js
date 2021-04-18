import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import invariant from 'fbjs/lib/invariant';
import BaseView from '../../utils/rnw-compat/BaseView';
import CollapseContext from './CollapseContext';
import CollapseProvider from './CollapseProvider';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Collapse = React.forwardRef((props, ref) => {
  const collapse = useContext(CollapseContext);

  invariant(
    collapse,
    'Collapse can only be used inside a CollapseProvider component.',
  );

  const classes = cx(
    // constant classes
    'collapse',
    // variable classes
    collapse.visible && 'show',
  );

  return (
    <BaseView
      {...props}
      ref={ref}
      nativeID={collapse.identifier}
      essentials={{ className: classes }}
    />
  );
});

Collapse.displayName = 'Collapse';
Collapse.propTypes = propTypes;

Collapse.Context = CollapseContext;
Collapse.Provider = CollapseProvider;

export default Collapse;
