import { keyMirror } from 'ramda-extension';

export const tournamentStyles = keyMirror({
  TEST: null,
});

export const BLOCK_SCALE = 35;

export const MINUTES_IN_BLOCK = 5;

export const TABLE_TOP_PADDING = 50;

export const BLOCK_OFFSET = 3;

export const SEXES = keyMirror({
  M: null,
  F: null,
});

export const SCHEDULE_FORM_NAME = 'schedule';

export const BLOCK_DND_NAME = 'block';

export const BLOCKS_PROPS_TO_SEND = [
  'startTime',
  'persons',
  'style',
  'category',
  'sex',
  'dayId',
  'areaId',
  'sportId',
  'age',
  'customParameter',
];
