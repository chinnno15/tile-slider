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
  baseImageWidth,
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

  return <div className='tile' style={bgProps} id={`tile-${index}`}></div>;
};
