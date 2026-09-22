import type {
  BodySide,
  Difficulty,
  FilterKey,
  Gender,
  ProductPurpose,
  ResistanceLevel,
  SearchResultKind,
  SortKey,
  TrainingLevel,
} from './types';

/** Zentrale Beschriftungen – hier später der Einstiegspunkt für i18n. */

export const purposeLabels: Record<ProductPurpose, string> = {
  stabilisieren: 'Stabilisieren',
  entlasten: 'Entlasten',
  mobilisieren: 'Mobilisieren',
  aktivieren: 'Aktivieren',
  kraeftigen: 'Kräftigen',
  balance: 'Balance',
  koordination: 'Koordination',
  regeneration: 'Regeneration',
  'return-to-sport': 'Return to Sport',
  praevention: 'Prävention',
  taping: 'Taping',
  heimtraining: 'Heimtraining',
};

export const genderLabels: Record<Gender, string> = {
  damen: 'Damen',
  herren: 'Herren',
  unisex: 'Unisex',
};

export const resistanceLabels: Record<ResistanceLevel, string> = {
  'sehr-leicht': 'Sehr leicht',
  leicht: 'Leicht',
  mittel: 'Mittel',
  stark: 'Stark',
  'sehr-stark': 'Sehr stark',
};

export const trainingLevelLabels: Record<TrainingLevel, string> = {
  einsteiger: 'Einsteiger',
  fortgeschritten: 'Fortgeschritten',
  profi: 'Profi',
};

export const sideLabels: Record<BodySide, string> = {
  links: 'Links',
  rechts: 'Rechts',
  beidseitig: 'Beidseitig',
};

export const difficultyLabels: Record<Difficulty, string> = {
  leicht: 'Leicht',
  mittel: 'Mittel',
  anspruchsvoll: 'Anspruchsvoll',
};

export const filterLabels: Record<FilterKey, string> = {
  gender: 'Geschlecht',
  bodyRegion: 'Körperregion',
  condition: 'Beschwerde',
  purpose: 'Verwendungszweck',
  sport: 'Sportart',
  size: 'Größe',
  color: 'Farbe',
  resistance: 'Widerstand',
  length: 'Länge',
  trainingLevel: 'Trainingsniveau',
  brand: 'Marke',
  material: 'Material',
  price: 'Preis',
};

export const sortLabels: Record<SortKey, string> = {
  empfohlen: 'Empfohlen',
  'preis-auf': 'Preis aufsteigend',
  'preis-ab': 'Preis absteigend',
  'name-az': 'Name A–Z',
  neu: 'Neuheiten',
};

export const searchKindLabels: Record<SearchResultKind, string> = {
  produkt: 'Produkt',
  kategorie: 'Kategorie',
  koerperregion: 'Körperregion',
  beschwerde: 'Beschwerde',
  ziel: 'Ziel',
  sportart: 'Sportart',
  uebung: 'Übung',
  'tape-anleitung': 'Tape-Anleitung',
  'back-to-sport': 'Back to Sport',
};
