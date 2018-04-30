import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { UTILS } from '../../utils/propTypes';

const propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['unordered', 'ordered']),
  inline: PropTypes.bool,
  class: PropTypes.arrayOf(UTILS),
  style: PropTypes.object,
};

const defaultProps = {
  variant: 'unordered',
  inline: false,
  class: null,
  style: null,
};

function List({
  children, variant, inline, class: utils, style,
}) {
  const classes = cx(utils.join(' '));

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;
