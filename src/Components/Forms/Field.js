import React from 'react';
import PropTypes from 'prop-types';
import { BaseView, BaseText } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.node,
  touched: PropTypes.bool,
  info: PropTypes.string,
};

const defaultProps = {
  error: null,
  touched: false,
  info: null,
};

function Field({
  children, error, touched, info,
}) {
  return (
    <BaseView className="form-group">
      {children}
      {touched && error && <BaseText className="form-text text-danger">{error}</BaseText>}
      {info && <BaseText className="form-text text-muted">{info}</BaseText>}
    </BaseView>
  );
}

Field.propTypes = propTypes;
Field.defaultProps = defaultProps;

export default Field;
