import type { BodyView, Slug } from '@/lib/types';

/**
 * Geometrie des Körpernavigators.
 *
 * Die Figur ist bewusst stilisiert: Der Körper entsteht aus Kapseln
 * (dicke Linien mit runden Enden) und Kreisen – modern und grafisch, nicht
 * anatomisch-medizinisch. Beide Ansichten nutzen dasselbe lokale
 * Koordinatensystem (200 x 560) und werden im SVG nebeneinander gesetzt.
 *
 * Neue Regionen brauchen nur einen Eintrag in `hotspots` – Links, Titel und
 * Hover-Zustand entstehen automatisch aus den Katalogdaten.
 */

export const FIGURE_WIDTH = 200;
export const FIGURE_HEIGHT = 560;

export type Shape =
  | { kind: 'circle'; cx: number; cy: number; r: number }
  | { kind: 'rect'; x: number; y: number; width: number; height: number; rx: number }
  | { kind: 'capsule'; x1: number; y1: number; x2: number; y2: number; width: number };

/** Grundkörper – wird in beiden Ansichten identisch gezeichnet. */
export const figureShapes: Shape[] = [
  { kind: 'circle', cx: 100, cy: 44, r: 30 }, // Kopf
  { kind: 'capsule', x1: 100, y1: 72, x2: 100, y2: 98, width: 26 }, // Hals
  { kind: 'rect', x: 68, y: 94, width: 64, height: 158, rx: 26 }, // Rumpf
  { kind: 'rect', x: 68, y: 236, width: 64, height: 52, rx: 22 }, // Becken

  // Arme – bewusst vom Rumpf abgesetzt, damit die Silhouette lesbar bleibt
  { kind: 'capsule', x1: 66, y1: 118, x2: 46, y2: 192, width: 22 },
  { kind: 'capsule', x1: 45, y1: 202, x2: 38, y2: 268, width: 18 },
  { kind: 'capsule', x1: 37, y1: 278, x2: 35, y2: 304, width: 17 },
  { kind: 'capsule', x1: 134, y1: 118, x2: 154, y2: 192, width: 22 },
  { kind: 'capsule', x1: 155, y1: 202, x2: 162, y2: 268, width: 18 },
  { kind: 'capsule', x1: 163, y1: 278, x2: 165, y2: 304, width: 17 },

  // Beine
  { kind: 'capsule', x1: 84, y1: 284, x2: 79, y2: 366, width: 38 },
  { kind: 'capsule', x1: 78, y1: 384, x2: 76, y2: 458, width: 28 },
  { kind: 'capsule', x1: 76, y1: 470, x2: 75, y2: 494, width: 22 },
  { kind: 'capsule', x1: 116, y1: 284, x2: 121, y2: 366, width: 38 },
  { kind: 'capsule', x1: 122, y1: 384, x2: 124, y2: 458, width: 28 },
  { kind: 'capsule', x1: 124, y1: 470, x2: 125, y2: 494, width: 22 },
];

/** Füße – in der Vorderansicht nach vorn, in der Rückansicht nach hinten. */
export const footShapes: Record<BodyView, Shape[]> = {
  front: [
    { kind: 'capsule', x1: 74, y1: 502, x2: 64, y2: 508, width: 20 },
    { kind: 'capsule', x1: 126, y1: 502, x2: 136, y2: 508, width: 20 },
  ],
  back: [
    { kind: 'capsule', x1: 74, y1: 502, x2: 80, y2: 508, width: 20 },
    { kind: 'capsule', x1: 126, y1: 502, x2: 120, y2: 508, width: 20 },
  ],
};

export interface Hotspot {
  regionSlug: Slug;
  view: BodyView;
  shapes: Shape[];
}

export const hotspots: Hotspot[] = [
  /* ------------------------------------------------------------ Vorderseite */
  {
    regionSlug: 'kopf-nacken',
    view: 'front',
    shapes: [
      { kind: 'circle', cx: 100, cy: 44, r: 32 },
      { kind: 'capsule', x1: 100, y1: 74, x2: 100, y2: 94, width: 28 },
    ],
  },
  {
    regionSlug: 'schulter',
    view: 'front',
    shapes: [
      { kind: 'circle', cx: 68, cy: 112, r: 21 },
      { kind: 'circle', cx: 132, cy: 112, r: 21 },
    ],
  },
  {
    regionSlug: 'oberarm',
    view: 'front',
    shapes: [
      { kind: 'capsule', x1: 64, y1: 128, x2: 47, y2: 186, width: 24 },
      { kind: 'capsule', x1: 136, y1: 128, x2: 153, y2: 186, width: 24 },
    ],
  },
  {
    regionSlug: 'ellenbogen',
    view: 'front',
    shapes: [
      { kind: 'circle', cx: 45, cy: 196, r: 14 },
      { kind: 'circle', cx: 155, cy: 196, r: 14 },
    ],
  },
  {
    regionSlug: 'unterarm',
    view: 'front',
    shapes: [
      { kind: 'capsule', x1: 43, y1: 212, x2: 39, y2: 262, width: 20 },
      { kind: 'capsule', x1: 157, y1: 212, x2: 161, y2: 262, width: 20 },
    ],
  },
  {
    regionSlug: 'handgelenk',
    view: 'front',
    shapes: [
      { kind: 'circle', cx: 38, cy: 272, r: 12 },
      { kind: 'circle', cx: 162, cy: 272, r: 12 },
    ],
  },
  {
    regionSlug: 'hand-finger',
    view: 'front',
    shapes: [
      { kind: 'capsule', x1: 36, y1: 284, x2: 35, y2: 304, width: 20 },
      { kind: 'capsule', x1: 164, y1: 284, x2: 165, y2: 304, width: 20 },
    ],
  },
  {
    regionSlug: 'brustkorb',
    view: 'front',
    shapes: [{ kind: 'rect', x: 68, y: 100, width: 64, height: 78, rx: 24 }],
  },
  {
    regionSlug: 'huefte',
    view: 'front',
    shapes: [
      { kind: 'circle', cx: 78, cy: 256, r: 19 },
      { kind: 'circle', cx: 122, cy: 256, r: 19 },
    ],
  },
  {
    regionSlug: 'leiste',
    view: 'front',
    shapes: [{ kind: 'rect', x: 87, y: 252, width: 26, height: 36, rx: 12 }],
  },
  {
    regionSlug: 'oberschenkel',
    view: 'front',
    shapes: [
      { kind: 'capsule', x1: 84, y1: 294, x2: 79, y2: 360, width: 40 },
      { kind: 'capsule', x1: 116, y1: 294, x2: 121, y2: 360, width: 40 },
    ],
  },
  {
    regionSlug: 'knie',
    view: 'front',
    shapes: [
      { kind: 'circle', cx: 78, cy: 374, r: 20 },
      { kind: 'circle', cx: 122, cy: 374, r: 20 },
    ],
  },
  {
    regionSlug: 'unterschenkel',
    view: 'front',
    shapes: [
      { kind: 'capsule', x1: 77, y1: 396, x2: 76, y2: 452, width: 30 },
      { kind: 'capsule', x1: 123, y1: 396, x2: 124, y2: 452, width: 30 },
    ],
  },
  {
    regionSlug: 'sprunggelenk',
    view: 'front',
    shapes: [
      { kind: 'circle', cx: 76, cy: 468, r: 15 },
      { kind: 'circle', cx: 124, cy: 468, r: 15 },
    ],
  },
  {
    regionSlug: 'fuss',
    view: 'front',
    shapes: [
      { kind: 'capsule', x1: 75, y1: 488, x2: 65, y2: 507, width: 22 },
      { kind: 'capsule', x1: 125, y1: 488, x2: 135, y2: 507, width: 22 },
    ],
  },

  /* -------------------------------------------------------------- Rückseite */
  {
    regionSlug: 'ruecken',
    view: 'back',
    shapes: [{ kind: 'rect', x: 68, y: 100, width: 64, height: 88, rx: 24 }],
  },
  {
    regionSlug: 'lendenwirbelsaeule',
    view: 'back',
    shapes: [{ kind: 'rect', x: 72, y: 192, width: 56, height: 56, rx: 20 }],
  },
  {
    regionSlug: 'wade',
    view: 'back',
    shapes: [
      { kind: 'capsule', x1: 77, y1: 394, x2: 76, y2: 444, width: 30 },
      { kind: 'capsule', x1: 123, y1: 394, x2: 124, y2: 444, width: 30 },
    ],
  },
  {
    regionSlug: 'achillessehne',
    view: 'back',
    shapes: [
      { kind: 'capsule', x1: 76, y1: 456, x2: 76, y2: 478, width: 15 },
      { kind: 'capsule', x1: 124, y1: 456, x2: 124, y2: 478, width: 15 },
    ],
  },
  {
    regionSlug: 'ferse',
    view: 'back',
    shapes: [
      { kind: 'circle', cx: 77, cy: 496, r: 13 },
      { kind: 'circle', cx: 123, cy: 496, r: 13 },
    ],
  },
];

export function hotspotsFor(view: BodyView): Hotspot[] {
  return hotspots.filter((hotspot) => hotspot.view === view);
}
