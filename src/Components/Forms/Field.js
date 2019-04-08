import React from 'react';
import PropTypes from 'prop-types';
import { BaseView, BaseText } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.node,
  // TODO: Normally touched should only be of type bool, but because of
  // setNestedObjectValues in Formik.tsx it can also be an array or an object.
  // This behaviour is odd, but it does not harm, because an array/object
  // can never be undefined or false, so even an empty array will count as
  // touched.
  // Reference: https://github.com/jaredpalmer/formik/blob/master/src/Formik.tsx#L429
  touched: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object,
  ]),
  info: PropTypes.string,
};

const defaultProps = {
  error: null,
  touched: false,
  info: null,
};

function Field({ children, error, touched, info }) {
  return (
    <BaseView className="form-group">
      {children}
      {touched && error && (
        <BaseText className="form-text text-danger">{error}</BaseText>
      )}
      {info && <BaseText className="form-text text-muted">{info}</BaseText>}
    </BaseView>
  );
}

Field.propTypes = propTypes;
Field.defaultProps = defaultProps;

export default Field;
