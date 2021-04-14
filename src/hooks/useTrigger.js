import { useContext } from 'react';
import PropTypes from 'prop-types';
import invariant from 'fbjs/lib/invariant';
import warning from 'fbjs/lib/warning';

export const TriggerPropTypes = {
  toggle: PropTypes.object,
  target: PropTypes.string,
};

export default function useTrigger(toggle, target) {
  if (target) {
    invariant(toggle, 'Target needs a toggle context.');
  }

  if (!toggle) {
    return undefined;
  }

  const Context = toggle.Context || toggle;

  const toggleable = useContext(Context);

  warning(toggleable, `No matching ${Context.displayName} was found.`);

  if (!toggleable) {
    return undefined;
  }

  const element = toggleable(target);

  return {
    active: element.active,
    toggle: element.toggle,
    props: element.trigger.props,
    classes: element.trigger.classes,
    extra: element.extra,
  };
}
