export default function optional(condition, value) {
  if (!condition) {
    return undefined;
  }

  return value;
}
