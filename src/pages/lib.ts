export enum TileDirection {
  Up,
  Down,
  Left,
  Right,
}

export type onPositionChangeCallback = (direction: TileDirection) => void;

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(() => resolve(null), ms));
}
