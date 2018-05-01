// COLORS prop type
export const colors = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'danger',
  'light',
  'dark',
];

export const buttonColors = colors.push('link');

export const textColors = colors.concat(['body', 'muted', 'white', 'black-50', 'white-50']);

export const backgroundColors = colors.concat(['white', 'transparent']);

// SIZES prop type
export const sizes = ['sm', 'md', 'lg'];

// HEADING_SIZES prop type
export const headingSizes = [1, 2, 3, 4, 5, 6];

// DISPLAY_HEADING_SIZES prop type
export const displayHeadingSizes = [1, 2, 3, 4];

// GRID_SIZES prop type
export const gridSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'auto'];

// UTILS prop type
export const utils = (value, key, componentName, location, propFullName) => {
  // TODO: check for borders classes
  // TODO: check for clearfix classes
  // TODO: check for close icon classes

  // check for color classes
  if (
    /^(text-(primary|secondary|success|danger|warning|info|light|dark|body|muted|white|black-50|white-50)|bg-(primary|secondary|success|danger|warning|info|light|dark|white|transparent))$/.test(value[key])
  ) {
    return null;
  }

  // check for display classes
  if (
    /^(d(-(sm|md|lg|xl))?-(none|inline|inline-block|block|table|table-cell|table-row|flex|inline-flex))$/.test(value[key])
  ) {
    return null;
  }

  // TODO: check for embed classes
  // TODO: check for flex classes

  // check for float classes
  if (/^(float(-(sm|md|lg|xl))?-(left|right|none))$/.test(value[key])) {
    return null;
  }

  // TODO: check for image replacement classes

  // check for position classes
  if (
    /^(position-(static|relative|absolute|fixed|sticky)|fixed-(top|bottom)|sticky-top)$/.test(value[key])
  ) {
    return null;
  }

  // TODO: check for screenreaders classes
  // TODO: check for shadows classes
  // TODO: check for sizing classes

  // check for spacing classes
  if (/^(p|m)(t|b|l|r|x|y)?-([0-5]|auto)$/.test(value[key])) {
    return null;
  }

  // check for text classes
  if (
    /^(text-(justify|(((sm|md|lg|xl)-)?(left|center|right))|nowrap|truncate|lowercase|uppercase|capitalize|monospace)|font-(weight-(bold|normal|light)|italic))$/.test(value[key])
  ) {
    return null;
  }

  // TODO: check for vertical align classes
  // TODO: check for visibility classes

  // value is not valid style class, return error
  return new Error(`Invalid prop \`${propFullName}\` supplied to \`${componentName}\`. Validation failed.`);
};
