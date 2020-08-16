export function applyActive(props, active) {
  if (!active) {
    return props;
  }

  const { ...processedProps } = props;

  processedProps['aria-pressed'] = true;

  return processedProps;
}

export function applyDisabled(props, disabled) {
  if (!disabled) {
    return props;
  }

  const { tabIndex, ...processedProps } = props;
  const { accessibilityRole } = processedProps;

  processedProps['aria-disabled'] = true;

  if (accessibilityRole === 'button') {
    processedProps.disabled = true;
  } else {
    processedProps.tabIndex = -1;
  }

  return processedProps;
}
