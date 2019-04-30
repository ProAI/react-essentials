import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseView from '../../utils/rnw-compat/BaseView';
import ListGroupItem from './ListGroupItem';

const propTypes = {
  children: PropTypes.node.isRequired,
  flush: PropTypes.bool,
  horizontal: PropTypes.bool,
  horizontalSm: PropTypes.bool,
  horizontalMd: PropTypes.bool,
  horizontalLg: PropTypes.bool,
  horizontalXl: PropTypes.bool,
};

const defaultProps = {
  flush: false,
  horizontal: false,
  horizontalSm: false,
  horizontalMd: false,
  horizontalLg: false,
  horizontalXl: false,
};

function ListGroup({
  children,
  flush,
  horizontal,
  horizontalSm,
  horizontalMd,
  horizontalLg,
  horizontalXl,
  ...elementProps
}) {
  const classes = cx(
    // constant classes
    'list-group',
    // variable classes
    flush && 'list-group-flush',
    horizontal && 'list-group-horizontal',
    horizontalSm && 'list-group-horizontal-sm',
    horizontalMd && 'list-group-horizontal-md',
    horizontalLg && 'list-group-horizontal-lg',
    horizontalXl && 'list-group-horizontal-xl',
  );

  return (
    <BaseView {...elementProps} essentials={{ tag: 'ul', className: classes }}>
      {children}
    </BaseView>
  );
}

ListGroup.propTypes = propTypes;
ListGroup.defaultProps = defaultProps;

ListGroup.Item = ListGroupItem;

export default ListGroup;
