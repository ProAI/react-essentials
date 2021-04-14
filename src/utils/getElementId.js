export default function getElementId(identifier, name) {
  return `${identifier}${name ? `-${name}` : ''}`;
}
