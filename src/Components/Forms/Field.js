import React from 'react';
import PropTypes from 'prop-types';
import BaseText from '../../utils/rnw-compat/BaseText';
import BaseView from '../../utils/rnw-compat/BaseView';

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
