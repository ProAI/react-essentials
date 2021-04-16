import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import invariant from 'fbjs/lib/invariant';
import BaseView from '../../utils/rnw-compat/BaseView';
import CollapseContext from './CollapseContext';
import CollapseProvider from './CollapseProvider';
import useTarget from '../../hooks/useTarget';
import concatClasses from '../../utils/concatClasses';
import concatProps from '../../utils/concatProps';

const propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
};

const Collapse = React.forwardRef((props, ref) => {
  const { id, ...elementProps } = props;

  const target = useTarget(CollapseContext, id);

  invariant(
    target,
    'Collapse can only be used inside a CollapseProvider component.',
  );

  const classes = cx(
    // constant classes
    'collapse',
    // variable classes
    ...concatClasses(target),
  );

  return (
    <BaseView
      {...concatProps({ ...elementProps, ref }, target)}
      essentials={{ className: classes }}
    />
  );
});

Collapse.displayName = 'Collapse';
Collapse.propTypes = propTypes;

Collapse.Context = CollapseContext;
Collapse.Provider = CollapseProvider;

export default Collapse;
