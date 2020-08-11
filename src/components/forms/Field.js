import React from 'react';
import PropTypes from 'prop-types';
import BaseText from '../../utils/rnw-compat/BaseText';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.node,
  touched: PropTypes.bool.isRequired,
  info: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  elementProps: PropTypes.object.isRequired,
};

function Field(props) {
  const { children, error, touched = false, info, elementProps } = props;

  return (
    <BaseView {...elementProps} essentials={{ className: 'form-group' }}>
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
