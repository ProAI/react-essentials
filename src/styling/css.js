import transform from 'css-to-react-native';
import camelize from 'camelize';

// We'll not transform the following styles, because they are considered as web
// only. There is no real equivalent in native.
// See https://github.com/necolas/react-native-web/issues/44.
const webRuleNames = ['box-shadow'];

const pattern = /\$[a-zA-Z0-9]*/g;

function getValue(theme, value) {
  if (!value) {
    return '';
  }

  if (typeof value === 'function') {
    return value(theme);
  }

  return value;
}

function getTextContent(theme, fragments, ...values) {
  return (
    fragments
      .reduce((result, current, i) => {
        return `${result}${current}${getValue(theme, values[i])}`;
      }, '')
      // Remove line breaks.
      .replace(/\r?\n|\r/g, '')
      // Remove comments.
      .replace(/\/\*.*\*\//g, '')
  );
}

function hasFunctions(fragments, ...values) {
  return values.some(value => typeof value === 'function');
}

function hasVariables(textContent) {
  return textContent.search(pattern) !== -1;
}

function applyVariables(textContent, theme) {
  return textContent.replace(pattern, match => {
    return theme[match.substr(1)];
  });
}

function transformRules(textContent) {
  const webRules = {};

  const rules = textContent
    .split(';')
    .slice(0, -1)
    // Split text content into rules.
    .map(string => {
      const rule = string.split(':', 2);

      return rule.map(item => item.trim());
    })
    // Filter web rules.
    .filter(rule => {
      const isWebRule = webRuleNames.indexOf(rule[0]) !== -1;

      if (isWebRule) {
        const [name, value] = rule;
        webRules[camelize(name)] = value;

        return false;
      }

      return true;
    });

  return {
    ...webRules,
    ...transform(rules),
  };
}

export default function css(...input) {
  if (!hasFunctions(...input)) {
    const textContent = getTextContent(null, ...input);

    if (!hasVariables(textContent)) {
      return transformRules(textContent);
    }
  }

  return theme => {
    const textContent = getTextContent(theme, ...input);

    return transformRules(applyVariables(textContent, theme));
  };
}
