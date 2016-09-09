export function Timer(callback, delay) {
  let timerId;
  let start;
  let remaining = delay;

  this.pause = () => {
    clearTimeout(timerId);
    remaining -= new Date() - start;
  };

  this.resume = () => {
    start = new Date();
    clearTimeout(timerId);
    timerId = setTimeout(callback, remaining);
  };

  this.clear = () => {
    clearTimeout(timerId);
  };

  this.resume();
}

export function getPositionAttributes(placement) {
  let attributes = {};
  switch (placement) {
    case 'top center':
      attributes = {
        position: 'topCenter',
        className: 'top-center',
      };
      break;
    case 'bottom center':
      attributes = {
        position: 'bottomCenter',
        className: 'bottom-center',
      };
      break;
    case 'top left':
      attributes = {
        position: 'topLeft',
        className: 'top-left',
      };
      break;
    case 'top right':
      attributes = {
        position: 'topRight',
        className: 'top-right',
      };
      break;
    case 'bottom left':
      attributes = {
        position: 'bottomLeft',
        className: 'bottom-left',
      };
      break;
    case 'bottom right':
      attributes = {
        position: 'bottomRight',
        className: 'bottom-right',
      };
      break;
    default:
      attributes = {};
  }

  return attributes;
}

// From Modernizr
export function chooseTransitionEvent() {
  const el = document.createElement('fakeelement');
  const transitions = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
  };

  let foundTransition = null;
  Object.keys(transitions).forEach((value) => {
    if (el.style[value] !== undefined) {
      foundTransition = transitions[value];
    }
  });

  return foundTransition;
}
