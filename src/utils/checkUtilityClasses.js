export default function checkUtilityClasses(value) {
  const classNames = value.split(' ');

  classNames.forEach((className) => {
    // TODO: check for borders classes
    // TODO: check for clearfix classes
    // TODO: check for close icon classes

    // check for color classes
    // don't use text utils, because they are part of <BaseText>
    if (
      /^(bg-(primary|secondary|success|danger|warning|info|light|dark|white|transparent))$/.test(className)
    ) {
      return;
    }

    // check for display classes
    // display classes not supported in react-native

    // TODO: check for embed classes

    // check for flex classes
    if (
      /^((flex-(((sm|md|lg|xl)-)?((row|column)(-reverse)?|fill|((grow|shrink)-[0-1])|nowrap|wrap|wrap-reverse)))|(justify-content-((sm|md|lg|xl)-)?(start|end|center|between|around))|(align-((items|self)-((sm|md|lg|xl)-)?(start|end|center|baseline|stretch)))|(order-((sm|md|lg|xl)-)?[0-12])|(align-content-((sm|md|lg|xl)-)?(start|end|center|around|stretch)))$/.test(className)
    ) {
      return;
    }

    // check for float classes
    // float classes not supported in react-native

    // TODO: check for image replacement classes

    // check for position classes
    if (
      /^(position-(static|relative|absolute|fixed|sticky)|fixed-(top|bottom)|sticky-top)$/.test(className)
    ) {
      return;
    }

    // TODO: check for screenreaders classes
    // TODO: check for shadows classes
    // TODO: check for sizing classes

    // check for spacing classes
    if (/^(p|m)(t|b|l|r|x|y)?-((sm|md|lg|xl)-)?([0-5]|auto)$/.test(className)) {
      return;
    }

    // check for text classes
    // don't use text utils, because they are part of <BaseText>

    // TODO: check for vertical align classes
    // TODO: check for visibility classes

    // value is not valid style class, return error
    // eslint-disable-next-line no-console
    console.error(`Invalid prop class with invalid utility class \`${className}\` supplied. Validation failed.`);
  });
}
