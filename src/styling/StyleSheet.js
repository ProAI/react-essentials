import BaseStyleSheet from 'react-native-web/dist/cjs/exports/StyleSheet';
import Theme from './Theme';

const cache = [];
let initialized = false;

function makeStyle(source) {
  const preparedSource = source;
  const theme = Theme.get();

  Object.entries(source).forEach(([key, props]) => {
    if (typeof props === 'object') {
      Object.entries({ ...props }).forEach(([propKey, propValue]) => {
        if (typeof propValue === 'string' && propValue.charAt(0) === '$') {
          preparedSource[key][propKey] = theme[propValue.substr(1)];
        }
      });
    }
  });

  return BaseStyleSheet.create(preparedSource);
}

const StyleSheet = {
  create(source) {
    const sheet = {
      source,
      result: initialized ? makeStyle(source) : source,
    };

    cache.push(sheet);

    return sheet.result;
  },
  build(initialTheme: Object) {
    if (!initialized) {
      Theme.set(initialTheme);

      cache.forEach((sheet, key) => {
        Object.assign(cache[key].result, makeStyle(sheet.source));
      });
    }

    initialized = true;
  },
  value(key) {
    if (!initialized) {
      throw new Error('Use of StyleSheet.value() before initializing.');
    }

    const theme = Theme.get();

    return theme[key.substr(1)];
  },
};

export default StyleSheet;
