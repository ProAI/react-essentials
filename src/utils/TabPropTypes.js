import PropTypes from 'prop-types';
import ActionPropTypes from './ActionPropTypes';

const TabPropTypes = {
  ...ActionPropTypes,
  tabKey: PropTypes.string,
  exact: PropTypes.bool,
  strict: PropTypes.bool,
  isActive: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object,
};

export default TabPropTypes;
