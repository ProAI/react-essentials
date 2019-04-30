import PropTypes from 'prop-types';
import BaseTouchable from '../../utils/rnw-compat/BaseTouchable';
import useActionElement from '../../hooks/useActionElement';
import action from '../../utils/action';

const propTypes = {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  ...action.propTypes,
  children: PropTypes.node.isRequired,
};

const defaultProps = {
  ...action.defaultProps,
};

function DropdownItem(elementProps) {
  const createElement = useActionElement(BaseTouchable, elementProps);

  return createElement({
    className: 'dropdown-item',
  });
}

DropdownItem.propTypes = propTypes;
DropdownItem.defaultProps = defaultProps;

export default DropdownItem;
