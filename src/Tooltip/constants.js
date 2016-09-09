// eslint-disable-next-line import/prefer-default-export
export const defaultTetherConfig = {
  classPrefix: 'bs-tether',
  classes: { element: 'tooltip in', enabled: 'open' },
  constraints: [
    { to: 'scrollParent', attachment: 'together none' },
    { to: 'window', attachment: 'together none' },
  ],
};
