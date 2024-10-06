import type { ShlinkState } from '../../container/types';

/* eslint-disable no-param-reassign */
export const migrateDeprecatedSettings = (state: Partial<ShlinkState>): Partial<ShlinkState> => {
  if (!state.settings) {
    return state;
  }

  // The "last180Days" interval had a typo, with a lowercase d
  if ((state.settings.visits?.defaultInterval as any) === 'last180days') {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    state.settings.visits && (state.settings.visits.defaultInterval = 'last180Days');
  }

  return state;
};
