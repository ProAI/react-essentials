import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { UTILS } from '../../utils/propTypes';

const propTypes = {
  children: PropTypes.node.isRequired,
  class: PropTypes.arrayOf(UTILS),
  style: PropTypes.object,
};

const defaultProps = {
  class: null,
  style: null,
};

function ListGroupItem({ children, class: utils, style }) {
  const classes = cx(utils.join(' '));

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}

ListGroupItem.propTypes = propTypes;
ListGroupItem.defaultProps = defaultProps;

export default ListGroupItem;
