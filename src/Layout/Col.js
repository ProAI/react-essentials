// @flow
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.number.isRequired,
  push: PropTypes.number,
  pull: PropTypes.number,
  offset: PropTypes.number,
};

const defaultProps = {
  push: null,
  pull: null,
  offset: null,
};

function Col({ size, push, pull, offset, children }) {
  let classes = cx('col-xs-12', `col-md-${size}`);

  if (push) {
    classes = cx(classes, `push-md-${push}`);
  }

  if (pull) {
    classes = cx(classes, `pull-md-${pull}`);
  }

  if (offset) {
    classes = cx(classes, `offset-md-${offset}`);
  }

  return (
    <div className={classes}>
      {children}
    </div>
  );
}

Col.propTypes = propTypes;
Col.defaultProps = defaultProps;

export default Col;
