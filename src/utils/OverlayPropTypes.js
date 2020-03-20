import PropTypes from 'prop-types';
import { TRIGGERS, PLACEMENTS } from './constants';

const ActionPropTypes = {
  delay: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      show: PropTypes.number,
      hide: PropTypes.number,
    }),
  ]),
  trigger: PropTypes.oneOf(TRIGGERS),
  placement: PropTypes.oneOf(PLACEMENTS),
  fallbackPlacement: PropTypes.oneOf(['flip', 'clockwise', 'counterwise']),
};

export default ActionPropTypes;
