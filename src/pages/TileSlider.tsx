import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Grid } from 'react-loader-spinner';

import Button from './components/Button';
import { delay, TileDirection } from './lib';
import { onPositionChangeCallbackInputs, Tile } from './Tile';
import { ITileState } from './Tile';
import { cloneDeep, pick } from 'lodash';

interface ImageDimProps {
  height: number;
  width: number;
}

class TileState implements ITileState {
  imgIx: number;
  empty: boolean;
  rowIx: number;
  tileIx: number;

  constructor(inputs: { imgIx: number; empty?: boolean }) {
    const { imgIx, empty } = inputs;
    this.imgIx = imgIx;
    this.tileIx = 0;
    this.rowIx = 0;
    this.empty = empty ? empty : false;
  }
}

const tilesInitial: [TileState[], TileState[], TileState[]]  = [
  [
    new TileState({ imgIx: 0, empty: false }),
    new TileState({ imgIx: 1, empty: false }),
    new TileState({ imgIx: 2, empty: false }),
  ],
  [
    new TileState({ imgIx: 3, empty: false }),
    new TileState({ imgIx: 4, empty: false }),
    new TileState({ imgIx: 5, empty: false }),
  ],
  [
    new TileState({ imgIx: 6, empty: false }),
    new TileState({ imgIx: 7, empty: false }),
    new TileState({ imgIx: 8, empty: false }),
  ],
];

function getRandomItem<T>(array: T[]): { item: T; index: number } {
  if (array.length === 0) {
    throw new Error('Array is empty.');
  }
  const randomIndex = Math.floor(Math.random() * array.length);
  const item = array[randomIndex];

  if (!item) {
    throw new Error('Item does not exist.');
  }

  return { item, index: randomIndex };
}

function initTileStates(state: [TileState[], TileState[], TileState[]]) {
  // random empty tile
  const flatState = state.flat();

  const { item: tile, index: ix } = getRandomItem(flatState);

  const empty = flatState.filter((tile) => {
    return tile.empty;
  });

  if (empty.length == 0) {
    tile.empty = true;
  }

  for (let rowIx = 0; rowIx < state.length; rowIx++) {
    const row = state[rowIx] || [];
    for (let tileIx = 0; tileIx < row.length; tileIx++) {
      const tile = row[tileIx] || {rowIx: 0, tileIx: 0};
      tile.rowIx = rowIx; 
      tile.tileIx = tileIx;
    }
  }

  return state;
}

interface TileSliderProps {
  imageUrl: string;
}

const TileSlider: React.FC<TileSliderProps> = (input) => {
  const { imageUrl } = input;
  const [imageDims, setImageDims] = useState<ImageDimProps | null>(null);
  const [tiles, setTiles] = useState<[TileState[], TileState[], TileState[]]>(
    initTileStates(tilesInitial),
  );
  const [whiteTileIx, setWhiteTileIx] = useState(0);


  async function onImageLoad(event: { currentTarget: HTMLImageElement }) {
    const image = event.currentTarget;

    await delay(600);

    setImageDims({
      height: image.naturalHeight,
      width: image.naturalWidth,
    });
  }

  function resetTiles() {
    setTiles(initTileStates(tilesInitial));
  }

  function moveToWhiteTile(opts: {
    tiles: [TileState[], TileState[], TileState[]];
    inputs: onPositionChangeCallbackInputs;
    tile: ITileState;
    whiteTile: ITileState;
  }) {
    const { tiles, inputs, tile, whiteTile } = opts;
    const oldWhiteTile = {...whiteTile};
    const oldTile = {...tile};

    whiteTile.rowIx = tile.rowIx; 
    whiteTile.tileIx = tile.tileIx

    tile.rowIx = inputs.rowIx;
    tile.tileIx = inputs.tileIx;

    tiles[oldWhiteTile.rowIx][oldWhiteTile.tileIx] = tile;
    tiles[oldTile.rowIx][oldTile.tileIx] = whiteTile;

    setTiles(tiles);
  }

  function onTilePositionChange(inputs: onPositionChangeCallbackInputs) {
    const state = tiles || [[], [], []];

    let whiteTile = state.flat().filter((tile) => tile.empty)[0];

    setWhiteTileIx(state.flat().indexOf(whiteTile)); 

    for (let rowIx = 0; rowIx < state.length; rowIx++) {
      const row = state[rowIx] || [];

      for (let tileIx = 0; tileIx < row.length; tileIx++) {
        const tile = row[tileIx] || ({} as ITileState);

        if (tile.empty) {
          whiteTile = tile;
        }

        if (tile.tileIx == inputs.tileIx && tile.rowIx == inputs.rowIx &&
          whiteTile
        ) {
          if (!tile.empty) {
            return moveToWhiteTile({ 
              tiles, inputs, tile, whiteTile });
          }
        }
      }
    }
  }

  return (
    <div className='w-80 my-12 mx-auto'>
      {imageDims && tiles ? (
        <div>
          <div className='grid grid-cols-3 gap-2' datawhitetileix={whiteTileIx}>
            {tiles.flat().map((tile: ITileState) => (
              <Tile
                key={tile.imgIx}
                imageUrl={imageUrl}
                imgIx={tile.imgIx}
                empty={tile.empty}
                onPositionChange={onTilePositionChange}
                baseImageHeight={imageDims.height}
                baseImageWidth={imageDims.width}
                tileIx={tile.tileIx}
                rowIx={tile.rowIx}
              ></Tile>
            ))}
          </div>
          <div>
            <Button text='Reset' onClick={resetTiles}></Button>
          </div>
        </div>
      ) : (
        <div className='w-full'>
          <div className='w-12 mx-auto pt-24'>
            <Grid
              visible={true}
              height='80'
              width='80'
              color='#4fa94d'
              ariaLabel='grid-loading'
              radius='12.5'
              wrapperStyle={{}}
              wrapperClass='grid-wrapper'
            />
          </div>

          <Image
            src={imageUrl}
            alt=''
            height={500}
            width={500}
            className='invisible'
            onLoad={onImageLoad}
          ></Image>
        </div>
      )}
    </div>
  );
};

export default TileSlider;
