import { useContext } from 'react';

export default function useTarget(toggle, target) {
  if (!toggle) {
    return undefined;
  }

  const toggleable = useContext(toggle.Context || toggle);

  if (!toggleable) {
    return undefined;
  }

  const element = toggleable(target);

  return {
    active: element.active,
    toggle: element.toggle,
    props: element.target.props,
    classes: element.target.classes,
    extra: element.extra,
  };
}
