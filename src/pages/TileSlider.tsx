import Image from 'next/image';
import { useState } from "react";
import { Grid } from "react-loader-spinner";

import { delay,TileDirection } from "./lib";
import { Tile } from "./Tile";

interface ImageDimProps {
  height: number;
  width: number;
}

interface ITileState {
  imgIx: number;
  empty: boolean;
  hasMoveLeft: boolean;
  hasMoveRight: boolean;
  hasMoveUp: boolean;
  hasMoveDown: boolean;
}

class TileState implements ITileState {
  imgIx: number;
  empty: boolean;
  hasMoveLeft: boolean;
  hasMoveRight: boolean;
  hasMoveUp: boolean;
  hasMoveDown: boolean;

  constructor(inputs: {imgIx: number, empty?: boolean}) {
    const {imgIx, empty} = inputs;
    this.imgIx = imgIx;
    this.empty = empty ? empty : false;

    this.hasMoveLeft = false;
    this.hasMoveRight = false;
    this.hasMoveDown = false;
    this.hasMoveUp = false;
  }
}

const tilesInitial: TileState[][] = [
  [
    new TileState({imgIx: 0, empty: true}),
    new TileState({imgIx: 1, empty: true}),
    new TileState({imgIx: 2, empty: true}),
  ],
  [
    new TileState({imgIx: 3, empty: true}),
    new TileState({imgIx: 4, empty: true}),
    new TileState({imgIx: 5, empty: true}),
  ],
  [
    new TileState({imgIx: 6, empty: true}),
    new TileState({imgIx: 7, empty: true}),
    new TileState({imgIx: 8, empty: true}),
  ],

];

function validateMoves(state: TileState[][]) {

  return state;
}

function onTilePositionChange(direction: TileDirection) {
  console.log(direction)
}

interface TileSliderProps {
  imageUrl: string;
}

const TileSlider: React.FC<TileSliderProps> = (input) => {
  const {imageUrl} = input;
  const [imageDims, setImageDims] = useState<ImageDimProps | null>(null);

  const [tiles, setTiles] = useState(validateMoves(tilesInitial));

  async function onImageLoad(event: { currentTarget: HTMLImageElement }) {
    const image = event.currentTarget;

    await delay(600);

    setImageDims({
      height: image.naturalHeight,
      width: image.naturalWidth,
    });
  }

  return (
    <div className='w-80 my-12 mx-auto'>
      {imageDims ? (
        <div className='grid grid-cols-3 gap-2'>
          {tiles.flat().map((tile: ITileState) => (
            <Tile
              key={tile.imgIx}
              imageUrl={imageUrl}
              index={tile.imgIx}
              onPositionChange={onTilePositionChange}
              baseImageHeight={imageDims.height}
              baseImageWidth={imageDims.width}
            ></Tile>
          ))}
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
