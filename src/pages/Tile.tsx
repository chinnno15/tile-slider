interface TileProps {
  imageUrl: string;
  index?: number;
  baseImageHeight: number;
  baseImageWidth: number;
}

export const Tile: React.FC<TileProps> = ({ imageUrl, index = 0, baseImageHeight, baseImageWidth }) => {
  console.log([baseImageHeight, baseImageWidth])

  let bpX = '';
  let bpY = '';
  const modulo = index % 3;

  if (modulo == 0) {
    bpX = '0px';
  }

  if (modulo == 1) {
    bpX = '33px';
  }

  if (modulo == 2) {
    bpX = '66px';
  }

  const row = Math.round(index / 3);

  const rowModulo = row % 3;

  if (rowModulo == 0) {
    bpY = '0px';
  }

  if (rowModulo == 1) {
    bpY = '33px';
  }

  if (rowModulo == 2) {
    bpY = '66px';
  }

  return (
    <div className="tile"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundPositionX: bpX,
        backgroundPositionY: bpY
      }}></div>
  );
};
