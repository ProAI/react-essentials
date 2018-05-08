// TRIGGERS
export const TRIGGERS = [
  'click',
  'hover',
  'focus',
  'manual',
  'click hover',
  'hover click',
  'hover focus',
  'focus hover',
  'click focus',
  'focus click',
];

// POSITIONS
export const POSITIONS = [
  'top left',
  'top right',
  'top center',
  'bottom left',
  'bottom right',
  'bottom center',
];

// COLORS prop type
export const COLORS = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'danger',
  'light',
  'dark',
];
export const BUTTON_COLORS = ['link', ...COLORS];
export const TEXT_COLORS = ['body', 'muted', 'white', 'black-50', 'white-50', ...COLORS];
export const BACKGROUND_COLORS = ['white', 'transparent', ...COLORS];

// SIZES prop type
export const SIZES = ['sm', 'lg'];

// HEADING_SIZES prop type
export const HEADING_SIZES = [1, 2, 3, 4, 5, 6];

// DISPLAY_HEADING_SIZES prop type
export const DISPLAY_HEADING_SIZES = [1, 2, 3, 4];

// GRID_SIZES prop type
export const GRID_SIZES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'auto'];
