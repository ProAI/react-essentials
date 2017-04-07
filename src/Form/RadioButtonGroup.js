import React, { PropTypes } from 'react';
import cx from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  legend: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

const defaultProps = {
  legend: null,
};

function RadioButtonGroup({ legend, input, meta, children }) {
  const fieldsetClasses = cx(
    'form-group',
    { 'has-danger': meta.error },
  );

  const childrenWithProps = React.Children.map(
    children,
    child => React.cloneElement(child, {
      input,
      meta,
    }),
  );

  return (
    <fieldset className={fieldsetClasses}>
      {legend && (
        <legend className="form-group-legend">{legend}</legend>
      )}
      {childrenWithProps}
      {meta.touched && meta.error && (
        <small className="text-danger">
          {meta.error}
        </small>
      )}
    </fieldset>
  );
}

RadioButtonGroup.propTypes = propTypes;
RadioButtonGroup.defaultProps = defaultProps;

export default RadioButtonGroup;
