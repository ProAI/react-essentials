import BaseStyleSheet from 'react-native-web/dist/cjs/exports/StyleSheet';

let activeThemeKey = null;

const themes = [];
const sheets = [];

function updateThemeKey(source) {
  const hash = JSON.stringify(source);

  const key = themes.findIndex(theme => theme.hash === hash);

  if (key === -1) {
    const length = themes.push({ hash, source });

    return length - 1;
  }

  return key;
}

function createSheet(sheet) {
  const theme = themes[activeThemeKey].source;
  const preparedSource = { ...sheet.source };

  // Apply theme to themeable styles.
  Object.entries(preparedSource).forEach(([key, createStyle]) => {
    if (typeof createStyle === 'function') {
      preparedSource[key] = createStyle(theme);
    }
  });

  return BaseStyleSheet.create(preparedSource);
}

const StyleSheet = {
  create(source) {
    // If the sheet contains of static styles only, theme changes will not
    // affect the sheet, so we can just create it, no need for caching.
    if (!Object.values(source).some(style => typeof style === 'function')) {
      return BaseStyleSheet.create(source);
    }

    // Create sheet object.
    const sheet = {
      source,
      cache: {},
      active: null,
    };

    // If initialized, set active sheet based by active theme.
    if (activeThemeKey !== null) {
      sheet.cache[activeThemeKey] = createSheet(sheet);
      sheet.active = sheet.cache[activeThemeKey];
    } else {
      sheet.active = { ...source };
    }

    sheets.push(sheet);

    return sheet.active;
  },
  build(theme: Object) {
    const themeKey = updateThemeKey(theme);

    // If theme is already set, we don't need to do anything.
    if (themeKey === activeThemeKey) {
      return;
    }

    // Set new theme active.
    activeThemeKey = themeKey;

    // Update style sheets.
    sheets.forEach((_, key) => {
      // If there is no result for the active theme, we'll create a themed
      // style sheet.
      if (!sheets[key].cache[themeKey]) {
        sheets[key].cache[themeKey] = createSheet(sheets[key]);
      }

      // Assign active object, which is also returned from the create
      // function, so style changes will be applied on next rerender in
      // the components as well.
      Object.assign(sheets[key].active, sheets[key].cache[themeKey]);
    });
  },
  value(key) {
    if (activeThemeKey === null) {
      throw new Error('Use of StyleSheet.value() before initializing.');
    }

    const theme = themes[activeThemeKey].source;

    return theme[key.substr(1)];
  },
};

export default StyleSheet;
