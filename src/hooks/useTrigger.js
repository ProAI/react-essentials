import { useContext } from 'react';
import PropTypes from 'prop-types';
import invariant from 'fbjs/lib/invariant';
import warning from 'fbjs/lib/warning';

export const TriggerPropTypes = {
  toggle: PropTypes.object,
  dismiss: PropTypes.object,
  target: PropTypes.string,
};

export default function useTrigger(toggle, dismiss, target) {
  if (target) {
    invariant(toggle, 'Target needs a toggle context.');
  }

  const trigger = toggle || dismiss;

  if (!trigger) {
    return undefined;
  }

  const Context = trigger.Context || toggle;

  const toggleable = useContext(Context);

  warning(toggleable, `No matching ${Context.displayName} was found.`);

  if (!toggleable) {
    return undefined;
  }

  return toggleable.trigger({ target, dismiss: !!dismiss });
}
