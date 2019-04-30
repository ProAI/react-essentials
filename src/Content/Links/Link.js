import PropTypes from 'prop-types';
import BaseText from '../../utils/rnw-compat/BaseText';
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

function Link(elementProps) {
  const createElement = useActionElement(BaseText, elementProps);

  return createElement({ tag: 'a' });
}

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;
