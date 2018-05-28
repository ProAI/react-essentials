export default function createUtilityClasses(utils) {
  if (!utils) {
    return utils;
  }

  return utils
    .replace('f-', 'flex-')
    .replace('jc-', 'justify-content-')
    .replace('ai-', 'align-items-')
    .replace('as-', 'align-self-')
    .replace('ac-', 'align-content-');
}
