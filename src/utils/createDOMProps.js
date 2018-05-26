import styleResolver from 'react-native-web/dist/cjs/exports/StyleSheet/styleResolver';

export default function createDOMProps({ style: providedStyle, ...props }) {
  const domProps = { ...props };

  const { className, style } = styleResolver.resolve(providedStyle);

  if (className && className.constructor === String) {
    domProps.className = props.className ? `${props.className} ${className}` : className;
  }
  if (style) {
    domProps.style = style;
  }

  return domProps;
}
