import {
  ArrowDownCircleIcon,
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  ArrowUpCircleIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';

import { TileDirection } from './lib';

export interface ITileState {
  tileIx: number;
  rowIx: number;
  imgIx: number;
  hasMoveUp: boolean;
  hasMoveRight: boolean;
  hasMoveLeft: boolean;
  hasMoveDown: boolean;
  empty: boolean;
}

export interface onPositionChangeCallbackInputs {
  direction: TileDirection;
  rowIx: number;
  tileIx: number;
}

export type onPositionChangeCallback = (input: onPositionChangeCallbackInputs) => void;

interface TileProps extends ITileState{
  imageUrl: string;
  baseImageHeight: number;
  baseImageWidth: number;
  onPositionChange: onPositionChangeCallback;
}

export const Tile: React.FC<TileProps> = ({
  imageUrl,
  imgIx = 0,
  baseImageHeight,
  baseImageWidth,
  onPositionChange,
  empty = false,
  rowIx,
  tileIx
}) => {
  const tileWidth = -100;
  let minImageDim = 0;

  if (baseImageHeight > baseImageWidth) {
    minImageDim = baseImageWidth;
  } else {
    minImageDim = baseImageHeight;
  }

  let bpX = '';
  let bpY = '';
  const modulo = imgIx % 3;

  if (modulo == 0) {
    bpX = `${tileWidth * 0}px`;
  }

  if (modulo == 1) {
    bpX = `${tileWidth * 1}px`;
  }

  if (modulo == 2) {
    bpX = `${tileWidth * 2}px`;
  }

  const row = Math.floor(imgIx / 3);

  const rowModulo = row % 3;

  if (rowModulo == 0) {
    bpY = `${tileWidth * 0}px`;
  }

  if (rowModulo == 1) {
    bpY = `${tileWidth * 1}px`;
  }

  if (rowModulo == 2) {
    bpY = `${tileWidth * 2}px`;
  }

  const bgProps = {
    backgroundImage: `url(${imageUrl})`,
    backgroundPositionX: `${bpX}`,
    backgroundPositionY: `${bpY}`,
    backgroundSize: '300%',
  };

  const tileProps = {
    tileIx,
    rowIx
  }

  return (
    <div>
      {!empty && (
        <div
          className='relative z-0'
          onClick={() => onPositionChange({
            direction: TileDirection.Left,
            ...tileProps
            })}
        >
          <div className='tile' style={bgProps} id={`tile-${imgIx}`}></div>
        </div>
      )}
    </div>
  );
};
