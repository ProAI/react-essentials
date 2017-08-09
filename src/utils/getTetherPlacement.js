export default function getTetherPlacement(placement) {
  switch (placement) {
    case 'top':
    case 'top center':
      return {
        attachment: 'bottom center',
        targetAttachment: 'top center',
      };
    case 'bottom':
    case 'bottom center':
      return {
        attachment: 'top center',
        targetAttachment: 'bottom center',
      };
    case 'left':
    case 'left center':
      return {
        attachment: 'middle right',
        targetAttachment: 'middle left',
      };
    case 'right':
    case 'right center':
      return {
        attachment: 'middle left',
        targetAttachment: 'middle right',
      };
    case 'top left':
      return {
        attachment: 'bottom left',
        targetAttachment: 'top left',
      };
    case 'top right':
      return {
        attachment: 'bottom right',
        targetAttachment: 'top right',
      };
    case 'bottom left':
      return {
        attachment: 'top left',
        targetAttachment: 'bottom left',
      };
    case 'bottom right':
      return {
        attachment: 'top right',
        targetAttachment: 'bottom right',
      };
    case 'right top':
      return {
        attachment: 'top left',
        targetAttachment: 'top right',
      };
    case 'right bottom':
      return {
        attachment: 'bottom left',
        targetAttachment: 'bottom right',
      };
    case 'left top':
      return {
        attachment: 'top right',
        targetAttachment: 'top left',
      };
    case 'left bottom':
      return {
        attachment: 'bottom right',
        targetAttachment: 'bottom left',
      };
    default:
      return {
        attachment: 'top center',
        targetAttachment: 'bottom center',
      };
  }
}
