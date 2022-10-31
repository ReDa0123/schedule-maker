import { tournamentStyles } from '../constants';

export const blocks = [
  {
    blockId: 12,
    startTime: null,
    players: 3,
    dayId: null,
    areaId: null,
    style: tournamentStyles.TEST,
    category: 'Mladší junioři',
    sex: 'M',
    sportId: 1,
    tournamentId: 1,
  },
  {
    blockId: 1,
    startTime: 120,
    players: 5,
    dayId: 1,
    areaId: 1,
    style: tournamentStyles.TEST,
    category: 'Mladší junioři',
    sex: 'M',
    sportId: 1,
    tournamentId: 1,
  },
  {
    blockId: 2,
    startTime: 300,
    players: 2,
    dayId: 1,
    areaId: 1,
    style: tournamentStyles.TEST,
    category: 'Starší junioři',
    sex: 'F',
    sportId: 1,
    tournamentId: 1,
  },
  {
    blockId: 3,
    startTime: 360,
    players: 4,
    dayId: 1,
    areaId: 1,
    style: tournamentStyles.TEST,
    category: 'Starší junioři',
    sportId: 2,
    tournamentId: 1,
  },
  {
    blockId: 4,
    startTime: 200,
    players: 3,
    dayId: 1,
    areaId: 1,
    style: tournamentStyles.TEST,
    category: 'Dospělí',
    sportId: 1,
    tournamentId: 1,
  },
  {
    blockId: 5,
    startTime: 100,
    players: 2,
    dayId: 1,
    areaId: 2,
    style: tournamentStyles.TEST,
    category: 'Mladší junioři',
    sportId: 2,
    tournamentId: 1,
  },
  {
    blockId: 6,
    startTime: 180,
    players: 8,
    dayId: 1,
    areaId: 2,
    style: tournamentStyles.TEST,
    category: 'Starší junioři',
    sex: 'M',
    sportId: 2,
    tournamentId: 1,
  },
  {
    blockId: 7,
    startTime: 240,
    players: 4,
    dayId: 1,
    areaId: 2,
    style: tournamentStyles.TEST,
    category: 'Starší junioři',
    sex: 'F',
    sportId: 1,
    tournamentId: 1,
  },
  {
    blockId: 8,
    startTime: 300,
    players: 3,
    dayId: 1,
    areaId: 2,
    style: tournamentStyles.TEST,
    category: 'Dospělí',
    sportId: 1,
    tournamentId: 1,
  },
];

export const areas = [
  {
    areaId: 1,
    name: 'Velká hala',
    tournamentId: 1,
  },
  {
    areaId: 2,
    name: 'Malá hala',
    tournamentId: 1,
  },
];

export const days = [
  {
    dayId: 1,
    date: '2022-01-01',
    description: 'Rozřazovací kolo',
    startTime: 100,
    endTime: 400,
    tournamentId: 1,
  },
  {
    dayId: 2,
    date: '2022-01-02',
    description: 'Dolní část tabulky',
    startTime: 100,
    endTime: 400,
    tournamentId: 1,
  },
];

export const sports = [
  {
    sportId: 1,
    name: 'Skok do dálky',
  },
  {
    sportId: 2,
    name: 'Běh na 100 m',
  },
];

export const tournaments = [
  {
    tournamentId: 1,
    name: 'Mistrovství ČR',
    location: 'Praha',
    startDate: '2022-01-01',
    endDate: '2022-01-02',
    userId: 1,
  },
];
