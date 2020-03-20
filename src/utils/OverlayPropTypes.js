import PropTypes from 'prop-types';
import { TRIGGERS, PLACEMENTS } from './constants';

const ActionPropTypes = {
  trigger: PropTypes.oneOf(TRIGGERS),
  placement: PropTypes.oneOf(PLACEMENTS),
  fallbackPlacement: PropTypes.oneOf(['flip', 'clockwise', 'counterwise']),
};

export default ActionPropTypes;
