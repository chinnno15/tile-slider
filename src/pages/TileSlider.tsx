import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Grid } from 'react-loader-spinner';

import Button from './components/Button';
import { delay, TileDirection } from './lib';
import { onPositionChangeCallbackInputs, Tile } from './Tile';
import { ITileState } from './Tile';
import { pick } from 'lodash';

interface ImageDimProps {
  height: number;
  width: number;
}

class TileState implements ITileState {
  imgIx: number;
  empty: boolean;
  hasMoveLeft: boolean;
  hasMoveRight: boolean;
  hasMoveUp: boolean;
  hasMoveDown: boolean;
  rowIx: number;
  tileIx: number;

  constructor(inputs: { imgIx: number; empty?: boolean }) {
    const { imgIx, empty } = inputs;
    this.imgIx = imgIx;
    this.tileIx = 0;
    this.rowIx = 0;
    this.empty = empty ? empty : false;

    this.hasMoveLeft = false;
    this.hasMoveRight = false;
    this.hasMoveDown = false;
    this.hasMoveUp = false;
  }
}

const tilesInitial: TileState[][] = [
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

function initTileStates(state: TileState[][]) {
  // random empty tile
  const flatState = state.flat();

  const { item: tile, index: ix } = getRandomItem(flatState);

  const empty = flatState.filter((tile) => {
    return tile.empty;
  });

  if (empty.length == 0) {
    tile.empty = true;
  }

  state = validateMoves(state);

  return state;
}

function validateMoves(state: TileState[][]) {
  // console.log(JSON.stringify(state, null, 2))

  let whiteTile = null;

  for (let rowIx = 0; rowIx < state.length; rowIx++) {
    const row = state[rowIx] || [];
    const rowLen = row.length;

    for (let tileIx = 0; tileIx < row.length; tileIx++) {
      const tile = row[tileIx] || ({} as ITileState);
      const tileLen = row.length;

      if (tile.empty) {
        whiteTile = tile;
      }

      tile.rowIx = rowIx;
      tile.tileIx = tileIx;

      if (rowIx == whiteTile?.rowIx) {
        tile.hasMoveLeft = true;
        tile.hasMoveRight = true;
      }

      if (tileIx == whiteTile?.tileIx) {
        tile.hasMoveDown = true;
        tile.hasMoveUp = true;
      }

      if (rowIx == 0) {
        tile.hasMoveUp = false;
      }

      if (rowIx == rowLen - 1) {
        tile.hasMoveDown = false;
      }

      if (tileIx == whiteTile?.tileIx && rowIx + 1 == whiteTile.rowIx) {
        tile.hasMoveUp = true;
        tile.hasMoveDown = false;
      }

      if (tileIx == whiteTile?.tileIx && rowIx - 1 == whiteTile.rowIx) {
        tile.hasMoveUp = true;
        tile.hasMoveDown = false;
      }

      // if (tileIx == 0) {
      //   tile.hasMoveLeft = false;
      // }

      // if (tileIx == tileLen - 1) {
      //   tile.hasMoveRight = false;
      // }
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
  const [tiles, setTiles] = useState<TileState[][] | null>(initTileStates(tilesInitial))

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
      tiles: TileState[][],
      inputs: onPositionChangeCallbackInputs,
      tile: ITileState,
      whiteTile: ITileState
    }) {
    const {inputs, tile, whiteTile } = opts;
    tile.rowIx = inputs.rowIx;
    tile.tileIx = inputs.tileIx;

    // console.log(JSON.stringify(tile, null, 2));

    // tiles[whiteTile.rowIx][whiteTile.tileIx] = tile;
    // tiles[tile.rowIx][tile.tileIx] = whiteTile;
    console.log('moved tile!!');

    setTiles(tiles)
  }

  function onTilePositionChange(inputs: onPositionChangeCallbackInputs) {
    const state = tiles;
    let whiteTile = null;

    for (let rowIx = 0; rowIx < state.length; rowIx++) {
      const row = state[rowIx] || [];

      for (let tileIx = 0; tileIx < row.length; tileIx++) {
        const tile = row[tileIx] || ({} as ITileState);

        if (tile.empty) {
          whiteTile = tile;
        }
        
        if(whiteTile) {
          moveToWhiteTile({tiles, inputs, tile, whiteTile });
        }

        // if (tile.tileIx == inputs.tileIx) {
        //   if (!tile.empty && whiteTile) {
        //     if (inputs.rowIx == whiteTile.rowIx) {
        //       // const data = [[inputs], tile.tileIx, tile.rowIx, whiteTile.rowIx]
        //       // console.log(JSON.stringify(data))

        //       // console.log('## in here ##')

        //       if(inputs.tileIx != whiteTile.tileIx &&
        //          Math.abs(whiteTile.tileIx - inputs.tileIx) == 1) {
        //         // move to newIx
        //         // console.log('## in here ##')
        //         moveToWhiteTile({tiles: state, inputs, tile, whiteTile });

        //       }

        //     }
        //     // if (tile.Ix - 1 == whiteTile.tileIx) {
        //     //   moveToWhiteTile({ tile, whiteTile });
        //     // }

        //   }
        // }
      }
    }
  }

  return (
    <div className='w-80 my-12 mx-auto'>
      {imageDims && tiles ? (
        <div>
          <div className='grid grid-cols-3 gap-2'>
            {tiles.flat().map((tile: ITileState) => (
              <Tile
                key={tile.imgIx}
                imageUrl={imageUrl}
                imgIx={tile.imgIx}
                empty={tile.empty}
                onPositionChange={onTilePositionChange}
                baseImageHeight={imageDims.height}
                baseImageWidth={imageDims.width}
                hasMoveDown={tile.hasMoveDown}
                hasMoveUp={tile.hasMoveUp}
                hasMoveLeft={tile.hasMoveLeft}
                hasMoveRight={tile.hasMoveRight}
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
