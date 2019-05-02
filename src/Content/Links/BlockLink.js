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

function BlockLink(elementProps) {
  const createElement = useActionElement(BaseTouchable, elementProps);

  return createElement({ tag: 'a' });
}

BlockLink.propTypes = propTypes;
BlockLink.defaultProps = defaultProps;

export default BlockLink;
