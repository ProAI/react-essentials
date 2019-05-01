import PropTypes from 'prop-types';
import { connect } from 'formik';
import cx from 'classnames';
import BaseTouchable from '../../utils/rnw-compat/BaseTouchable';
import { BUTTON_COLORS, SIZES } from '../../utils/constants';
import useActionElement from '../../hooks/useActionElement';
import action from '../../utils/action';

const propTypes = {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  ...action.propTypes,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['submit', 'reset']).isRequired,
  color: PropTypes.oneOf(BUTTON_COLORS),
  size: PropTypes.oneOf(SIZES),
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  formik: PropTypes.any.isRequired,
};

const defaultProps = {
  ...action.defaultProps,
  color: 'primary',
  size: null,
  active: false,
  disabled: false,
  block: false,
};

function FormButton({
  type,
  color,
  size,
  active,
  disabled,
  block,
  onClick,
  formik,
  ...elementProps
}) {
  const classes = cx(
    // constant classes
    'btn',
    `btn-${color}`,
    // variable classes
    size === 'sm' && 'btn-sm',
    size === 'lg' && 'btn-lg',
    active && 'active',
    disabled && 'disabled',
    block && 'btn-block',
  );

  const handleClick = event => {
    if (onClick) {
      onClick(event);
    }

    if (type === 'submit') {
      formik.handleSubmit(event);
    }

    if (type === 'reset') {
      formik.handleReset();
    }
  };

  const createElement = useActionElement(BaseTouchable, {
    ...elementProps,
    onClick: handleClick,
  });

  return createElement({
    className: classes,
  });
}

FormButton.propTypes = propTypes;
FormButton.defaultProps = defaultProps;

export default connect(FormButton);
