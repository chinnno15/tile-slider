import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { Grid } from 'react-loader-spinner';

import { Tile } from './Tile';

const imageUrl = '/el-diente-is-the-favorite.webp';



interface ImageDimProps {
  height: number;
  width: number;
}

export default function Home() {
  const [imageDims, setImageDims] = useState<ImageDimProps | null>(null);

  function onImageLoad(event: { currentTarget: HTMLImageElement }) {
    const image = event.currentTarget;

    setImageDims({
      height: image.naturalHeight,
      width: image.naturalWidth
    });
  }

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
            <div className='w-80 my-12 mx-auto'>
              {imageDims ? (
                <div className='grid grid-cols-3 gap-2'>
                  {[...Array(9).keys()].map((ix) => (
                    <Tile key={ix} 
                    imageUrl={imageUrl}
                    index={ix} 
                    baseImageHeight={imageDims.height}
                    baseImageWidth={imageDims.width}></Tile>
                  ))}
                </div>
              ) : (
                <div className='w-full'>
                  <div className='w-12 mx-auto'>
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
          </div>
        </main>
      </div>
    </>
  );
}
