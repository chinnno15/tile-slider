import Head from 'next/head';
import TileSlider from './TileSlider';

const imageUrl = '/el-diente-is-the-favorite.webp';

export default function Home() {
  return (
    <>
      <Head>
        <title>Tile Slider</title>
        <meta
          name='description'
          content={`
        `}
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='isolate bg-white'>
        <main>
          <div className='container w-96 mx-auto'>
            <div className='mt-8'>
              <h1 className='text-center'>Tile Slider</h1>
            </div>
            <TileSlider imageUrl={imageUrl}></TileSlider>
          </div>
        </main>
      </div>
    </>
  );
}
