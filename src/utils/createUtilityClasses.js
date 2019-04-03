export default function createUtilityClasses(utils) {
  if (!utils) {
    return utils;
  }

  return utils
    .replace(/jc-/g, 'justify-content-')
    .replace(/ai-/g, 'align-items-')
    .replace(/as-/g, 'align-self-')
    .replace(/ac-/g, 'align-content-');
}
