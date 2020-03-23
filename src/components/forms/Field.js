import React from 'react';
import PropTypes from 'prop-types';
import BaseText from '../../utils/rnw-compat/BaseText';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.node,
  touched: PropTypes.bool.isRequired,
  info: PropTypes.string,
};

function Field(props) {
  const { children, error, touched = false, info } = props;

  return (
    <BaseView essentials={{ className: 'form-group' }}>
      {children}
      {touched && error && (
        <BaseText essentials={{ className: 'form-text text-danger' }}>
          {error}
        </BaseText>
      )}
      {info && (
        <BaseText essentials={{ className: 'form-text text-muted' }}>
          {info}
        </BaseText>
      )}
    </BaseView>
  );
}

Field.propTypes = propTypes;

export default Field;
