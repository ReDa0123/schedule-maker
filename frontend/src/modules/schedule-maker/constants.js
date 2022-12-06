import { keyMirror } from 'ramda-extension';

export const INDIVIDUAL_TYPE = 'Individual performances';
export const SINGLE_TYPE = 'Single elimination';
export const DOUBLE_TYPE = 'Double elimination';
export const THREE_GAME_TYPE = '3 Game guarantee';
export const ROBIN_TYPE = 'Round robin';

export const tournamentStyles = [
  INDIVIDUAL_TYPE,
  SINGLE_TYPE,
  DOUBLE_TYPE,
  THREE_GAME_TYPE,
  ROBIN_TYPE,
];

export const BLOCK_SCALE = 35;

export const MINUTES_IN_BLOCK = 5;

export const TABLE_TOP_PADDING = 50;

export const BLOCK_OFFSET = 3;

export const SEXES = keyMirror({
  M: null,
  F: null,
});

export const SCHEDULE_FORM_NAME = 'schedule';

export const SCHEDULE_FORM_VERSION_NAME = 'selectedVersion';

export const BLOCK_DND_NAME = 'block';

export const SCHEDULE_AGENDA_DISPLAY = 'agenda';

export const SCHEDULE_DETAILED_DISPLAY = 'detailed';
