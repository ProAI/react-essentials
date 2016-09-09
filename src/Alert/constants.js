export const constants = {
  // Positions
  positions: [
    'top left',
    'top right',
    'top center',
    'bottom left',
    'bottom right',
    'bottom center',
  ],

  // Levels
  variants: [
    'success',
    'danger',
    'warning',
    'info',
  ],
};

export const defaultAlert = {
  title: null,
  content: null,
  variant: null,
  placement: 'top center',
  autoDismiss: 5,
  dismissible: true,
  icon: true,
  small: false,
  link: null,
};
