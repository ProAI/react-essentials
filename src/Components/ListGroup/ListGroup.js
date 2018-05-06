import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseView } from '../../utils/components';
import ListGroupItem from './ListGroupItem';
import ListGroupButton from './ListGroupButton';
import ListGroupLink from './ListGroupLink';

const propTypes = {
  flush: PropTypes.bool,
  actionable: PropTypes.bool,
};

const defaultProps = {
  flush: false,
  actionable: false,
};

function ListGroup({ flush, actionable, ...elementProps }) {
  const classes = cx(
    // constant classes
    'list-group',
    // variable classes
    flush && 'list-group-flush',
  );

  const tag = actionable ? 'div' : 'ul';

  return <BaseView props={elementProps} tag={tag} className={classes} />;
}

ListGroup.propTypes = propTypes;
ListGroup.defaultProps = defaultProps;

ListGroup.Item = ListGroupItem;
ListGroup.Button = ListGroupButton;
ListGroup.Link = ListGroupLink;

export default ListGroup;
