import type { CSSProperties } from 'react';

/** Prototype fields — block browser and password-manager autofill. */
export const UI_INPUT_PROPS = {
  autoComplete: 'off',
  'data-1p-ignore': true,
  'data-lpignore': 'true',
  'data-form-type': 'other',
} as const;

/** Checkout prototype — fields look real but accept no input. */
export const DISPLAY_ONLY_INPUT_PROPS = {
  ...UI_INPUT_PROPS,
  readOnly: true,
  tabIndex: -1,
  'aria-readonly': true,
} as const;

export const displayOnlyInputStyle: CSSProperties = {
  pointerEvents: 'none',
  cursor: 'default',
};
