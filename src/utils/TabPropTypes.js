import PropTypes from 'prop-types';
import ActionPropTypes from './ActionPropTypes';

const TabPropTypes = {
  ...ActionPropTypes,
  tabKey: PropTypes.string,
  exact: PropTypes.bool,
  strict: PropTypes.bool,
};

export default TabPropTypes;
