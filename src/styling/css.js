import transform from 'css-to-react-native';
import camelize from 'camelize';

const webRuleNames = ['box-shadow'];

export default function css(fragments: string[], ...values: string[]) {
  const webRules = {};

  const rules = fragments
    .reduce((result, current, i) => `${result}${current}${values[i] || ''}`, '')
    // Remove line breaks.
    .replace(/\r?\n|\r/g, '')
    // Remove comments.
    .replace(/\/\*.*\*\//g, '')
    .split(';')
    .slice(0, -1)
    .map(string => {
      const rule = string.split(':', 2);

      return rule.map(item => item.trim());
    })
    .filter(rule => {
      if (webRuleNames.indexOf(rule[0]) !== -1) {
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
