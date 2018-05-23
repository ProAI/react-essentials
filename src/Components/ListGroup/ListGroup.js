import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseView } from '../../utils/components';
import ListGroupItem from './ListGroupItem';
import ListGroupActionItem from './ListGroupActionItem';

const propTypes = {
  children: PropTypes.node.isRequired,
  flush: PropTypes.bool,
  actionable: PropTypes.bool,
};

const defaultProps = {
  flush: false,
  actionable: false,
};

function ListGroup({
  children, flush, actionable, ...elementProps
}) {
  const classes = cx(
    // constant classes
    'list-group',
    // variable classes
    flush && 'list-group-flush',
  );

  const tag = actionable ? 'div' : 'ul';

  return (
    <BaseView tag={tag} props={elementProps} className={classes}>
      {children}
    </BaseView>
  );
}

ListGroup.propTypes = propTypes;
ListGroup.defaultProps = defaultProps;

ListGroup.Item = ListGroupItem;
ListGroup.ActionItem = ListGroupActionItem;

export default ListGroup;
