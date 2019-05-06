import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseTouchable from '../../utils/rnw-compat/BaseTouchable';
import useActionElement from '../../hooks/useActionElement';
import action from '../../utils/action';

const propTypes = {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  ...action.propTypes,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
};

const defaultProps = {
  ...action.defaultProps,
  disabled: false,
  active: false,
};

function ActionListGroupItem(props) {
  const { disabled, active, ...elementProps } = props;

  const classes = cx(
    // constant classes
    'list-group-item',
    'list-group-item-action',
    // variable classes
    disabled && 'disabled',
    active && 'active',
  );

  const createElement = useActionElement(BaseTouchable, {
    disabled,
    ...elementProps,
  });

  return createElement({
    className: classes,
  });
}

ActionListGroupItem.propTypes = propTypes;
ActionListGroupItem.defaultProps = defaultProps;

export default ActionListGroupItem;
