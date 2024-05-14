import {
  ArrowLeftCircleIcon, 
  ArrowDownCircleIcon,
  ArrowRightCircleIcon,
  ArrowUpCircleIcon
} from '@heroicons/react/24/solid'
import { useState } from 'react';

interface TileProps {
  imageUrl: string;
  index?: number;
  baseImageHeight: number;
  baseImageWidth: number;
}

export const Tile: React.FC<TileProps> = ({
  imageUrl,
  index = 0,
  baseImageHeight,
  baseImageWidth
}) => {
  const [controlsEnabled, setControlsEnabled] = useState(false);
  const tileWidth = -100;
  let minImageDim = 0;

  if (baseImageHeight > baseImageWidth) {
    minImageDim = baseImageWidth;
  } else {
    minImageDim = baseImageHeight;
  }

  let bpX = '';
  let bpY = '';
  const modulo = index % 3;

  if (modulo == 0) {
    bpX = `${tileWidth * 0}px`;
  }

  if (modulo == 1) {
    bpX = `${tileWidth * 1}px`;
  }

  if (modulo == 2) {
    bpX = `${tileWidth * 2}px`;
  }

  const row = Math.floor(index / 3);

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

  // console.log(JSON.stringify({
  //   index,
  //   row,
  //   modulo, 
  //   rowModulo,
  //   ...bgProps
  // }, null, 2))

  return (
    <div className='relative z-0' 
    onMouseEnter={()=>setControlsEnabled(true)}
    onMouseLeave={()=>setControlsEnabled(false)}>
      {controlsEnabled ? (
        <div>
          <div className='absolute top-10 left-1 flex z-10'>
            <ArrowLeftCircleIcon className='text-gray-500 h-6 w-6'></ArrowLeftCircleIcon>
          </div>
          <div className='absolute bottom-1 right-10 flex z-10'>
            <ArrowDownCircleIcon className='text-gray-500 h-6 w-6'></ArrowDownCircleIcon>
          </div>
          <div className='absolute right-1 top-10 flex z-10'>
            <ArrowRightCircleIcon className='text-gray-500 h-6 w-6'></ArrowRightCircleIcon>
          </div>
          <div className='absolute top-1 right-10 flex z-10'>
            <ArrowUpCircleIcon className='text-gray-500 h-6 w-6'></ArrowUpCircleIcon>
          </div>
        </div>
      ):(<></>)}

      <div className='tile' style={bgProps} id={`tile-${index}`}></div>
    </div>
  );
};
